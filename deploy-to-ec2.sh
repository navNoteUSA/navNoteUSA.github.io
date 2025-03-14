#!/bin/bash
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}NavNote Deployment Script${NC}"
echo "============================="

# Configuration
STACK_NAME="NavNoteStack"
REGION="us-east-1"
KEY_NAME="navnote-key"
INSTANCE_TYPE="t2.micro"
AMI_ID="ami-0c7217cdde317cfec" # Amazon Linux 2023

# Check for AWS CLI
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed.${NC}"
    exit 1
fi

# Check AWS CLI configuration
echo -e "${BLUE}Checking AWS CLI configuration...${NC}"
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not configured properly.${NC}"
    echo "Run 'aws configure' to set up your AWS credentials."
    exit 1
fi
echo -e "${GREEN}AWS CLI is properly configured.${NC}"
echo ""

# Prompt for database credentials
echo -e "${BLUE}Enter database credentials:${NC}"
read -p "Database Username (default is navnoteadmin): " DB_USERNAME
DB_USERNAME=${DB_USERNAME:-navnoteadmin}

while true; do
    read -s -p "Database Password (min 8 characters): " DB_PASSWORD
    echo
    if [ ${#DB_PASSWORD} -ge 8 ]; then
        break
    else
        echo -e "${RED}Password must be at least 8 characters long.${NC}"
    fi
done

read -p "Database Name (default is navnotedb): " DB_NAME
DB_NAME=${DB_NAME:-navnotedb}
echo ""

# Create key pair if it doesn't exist
echo -e "${BLUE}Creating key pair...${NC}"
if ! aws ec2 describe-key-pairs --key-names ${KEY_NAME} --region ${REGION} &> /dev/null; then
    aws ec2 create-key-pair --key-name ${KEY_NAME} --query 'KeyMaterial' --output text --region ${REGION} > ${KEY_NAME}.pem
    chmod 400 ${KEY_NAME}.pem
    echo -e "${GREEN}Key pair created and saved to ${KEY_NAME}.pem${NC}"
else
    echo -e "${GREEN}Key pair ${KEY_NAME} already exists.${NC}"
fi
echo ""

# Deploy CloudFormation stack
echo -e "${BLUE}Deploying CloudFormation stack...${NC}"
aws cloudformation deploy \
    --template-file cloudformation-simple.yaml \
    --stack-name ${STACK_NAME} \
    --parameter-overrides \
    DBUsername=${DB_USERNAME} \
    DBPassword=${DB_PASSWORD} \
    DBName=${DB_NAME} \
    --capabilities CAPABILITY_IAM \
    --region ${REGION}

echo -e "${GREEN}CloudFormation stack deployed.${NC}"
echo ""

# Get CloudFormation outputs
echo -e "${BLUE}Getting CloudFormation outputs...${NC}"
DB_ENDPOINT=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='Database'].OutputValue" --output text --region ${REGION})
FRONTEND_REPO=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='FrontendRepository'].OutputValue" --output text --region ${REGION})
BACKEND_REPO=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='BackendRepository'].OutputValue" --output text --region ${REGION})
STATIC_BUCKET=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='StaticBucketName'].OutputValue" --output text --region ${REGION})
EC2_ROLE=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='EC2Role'].OutputValue" --output text --region ${REGION})
WEB_SG=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='WebServerSecurityGroup'].OutputValue" --output text --region ${REGION})
VPC_ID=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='VPC'].OutputValue" --output text --region ${REGION})
PUBLIC_SUBNETS=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='PublicSubnets'].OutputValue" --output text --region ${REGION})
PUBLIC_SUBNET1=$(echo ${PUBLIC_SUBNETS} | cut -d',' -f1)

echo -e "${GREEN}Retrieved CloudFormation outputs.${NC}"
echo ""

# Build and push Docker images
echo -e "${BLUE}Building and pushing Docker images...${NC}"

# Login to ECR
echo -e "${BLUE}Logging in to ECR...${NC}"
aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin $(echo ${FRONTEND_REPO} | cut -d'/' -f1)

# Update backend environment file
cat > navnote_backend/.env << EOF
DEBUG=False
SECRET_KEY=$(openssl rand -hex 32)
ALLOWED_HOSTS=*
DATABASE_URL=postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_ENDPOINT}:5432/${DB_NAME}
CORS_ALLOWED_ORIGINS=*
AWS_STORAGE_BUCKET_NAME=${STATIC_BUCKET}
AWS_S3_REGION_NAME=${REGION}
EOF

# Build and push frontend image
echo -e "${BLUE}Building and pushing frontend image...${NC}"
docker build -t ${FRONTEND_REPO}:latest .
docker push ${FRONTEND_REPO}:latest

# Build and push backend image
echo -e "${BLUE}Building and pushing backend image...${NC}"
cd navnote_backend
docker build -t ${BACKEND_REPO}:latest .
docker push ${BACKEND_REPO}:latest
cd ..

echo -e "${GREEN}Docker images built and pushed.${NC}"
echo ""

# Launch EC2 instance
echo -e "${BLUE}Launching EC2 instance...${NC}"

# Create user data script
cat > user-data.sh << EOF
#!/bin/bash
# Install Docker
yum update -y
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -aG docker ec2-user

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
yum install -y unzip
unzip awscliv2.zip
./aws/install

# Login to ECR (using instance role)
aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin $(echo ${FRONTEND_REPO} | cut -d'/' -f1)

# Pull Docker images
docker pull ${FRONTEND_REPO}:latest
docker pull ${BACKEND_REPO}:latest

# Create a docker-compose.yml file
cat > /home/ec2-user/docker-compose.yml << 'COMPOSE'
version: '3'

services:
  frontend:
    image: ${FRONTEND_REPO}:latest
    ports:
      - "80:80"
      - "443:443"
    restart: always
    depends_on:
      - backend

  backend:
    image: ${BACKEND_REPO}:latest
    ports:
      - "8000:8000"
    restart: always
    environment:
      - AWS_STORAGE_BUCKET_NAME=${STATIC_BUCKET}
      - AWS_S3_REGION_NAME=${REGION}
      - DEBUG=False
      - ALLOWED_HOSTS=*
      - DATABASE_URL=postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_ENDPOINT}:5432/${DB_NAME}
      - CORS_ALLOWED_ORIGINS=*
COMPOSE

# Install docker-compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Start containers
cd /home/ec2-user
docker-compose up -d
EOF

# Launch EC2 instance
INSTANCE_ID=$(aws ec2 run-instances \
    --image-id ${AMI_ID} \
    --instance-type ${INSTANCE_TYPE} \
    --key-name ${KEY_NAME} \
    --security-group-ids ${WEB_SG} \
    --subnet-id ${PUBLIC_SUBNET1} \
    --iam-instance-profile Name=${EC2_ROLE} \
    --user-data file://user-data.sh \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=NavNoteInstance}]" \
    --query 'Instances[0].InstanceId' \
    --output text \
    --region ${REGION})

echo -e "${GREEN}EC2 instance launched with ID: ${INSTANCE_ID}${NC}"
echo ""

# Wait for instance to be running
echo -e "${BLUE}Waiting for instance to be running...${NC}"
aws ec2 wait instance-running --instance-ids ${INSTANCE_ID} --region ${REGION}
echo -e "${GREEN}Instance is now running.${NC}"
echo ""

# Create and associate Elastic IP
echo -e "${BLUE}Creating and associating Elastic IP...${NC}"
ALLOCATION_ID=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text --region ${REGION})
ELASTIC_IP=$(aws ec2 describe-addresses --allocation-ids ${ALLOCATION_ID} --query 'Addresses[0].PublicIp' --output text --region ${REGION})
aws ec2 associate-address --instance-id ${INSTANCE_ID} --allocation-id ${ALLOCATION_ID} --region ${REGION}
echo -e "${GREEN}Elastic IP ${ELASTIC_IP} associated with instance.${NC}"
echo ""

# Save deployment info
cat > deployment-info.txt << EOF
# NavNote Deployment Information
STACK_NAME=${STACK_NAME}
INSTANCE_ID=${INSTANCE_ID}
PUBLIC_IP=${ELASTIC_IP}
ELASTIC_IP_ALLOCATION_ID=${ALLOCATION_ID}
KEY_FILE=${KEY_NAME}.pem
SSH_COMMAND=ssh -i ${KEY_NAME}.pem ec2-user@${ELASTIC_IP}
DB_ENDPOINT=${DB_ENDPOINT}
FRONTEND_REPO=${FRONTEND_REPO}
BACKEND_REPO=${BACKEND_REPO}
STATIC_BUCKET=${STATIC_BUCKET}
EOF

echo -e "${GREEN}Deployment information saved to deployment-info.txt${NC}"
echo ""

# Clean up
rm -f user-data.sh

echo -e "${BLUE}Next Steps:${NC}"
echo "1. Wait a few minutes for the instance to complete initialization."
echo "2. Access your application at: http://${ELASTIC_IP}"
echo "3. SSH into the instance using: ssh -i ${KEY_NAME}.pem ec2-user@${ELASTIC_IP}"
echo ""

echo -e "${GREEN}Deployment completed successfully!${NC}" 