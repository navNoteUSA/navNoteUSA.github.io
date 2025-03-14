#!/bin/bash
set -e

# Configuration
INSTANCE_NAME="NavNoteInstance"
INSTANCE_TYPE="t2.micro"
AMI_ID="ami-0c7217cdde317cfec"  # Amazon Linux 2023
KEY_NAME="navnote-key"
SECURITY_GROUP_NAME="NavNoteSecurityGroup"
REGION="us-east-1"
IAM_ROLE_NAME="NavNoteEC2Role"  # New IAM role name

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}NavNote EC2 Deployment Script${NC}"
echo "============================="
echo ""

# Check if AWS CLI is configured
echo -e "${BLUE}Checking AWS CLI configuration...${NC}"
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not configured properly.${NC}"
    echo "Run 'aws configure' to set up your AWS credentials."
    exit 1
fi
echo -e "${GREEN}AWS CLI is properly configured.${NC}"
echo ""

# Create key pair if it doesn't exist
echo -e "${BLUE}Creating key pair...${NC}"
if ! aws ec2 describe-key-pairs --key-names ${KEY_NAME} &> /dev/null; then
    aws ec2 create-key-pair --key-name ${KEY_NAME} --query 'KeyMaterial' --output text > ${KEY_NAME}.pem
    chmod 400 ${KEY_NAME}.pem
    echo -e "${GREEN}Key pair created and saved to ${KEY_NAME}.pem${NC}"
else
    echo -e "${GREEN}Key pair ${KEY_NAME} already exists.${NC}"
fi
echo ""

# Create IAM role for EC2 if it doesn't exist
echo -e "${BLUE}Setting up IAM role...${NC}"
if ! aws iam get-role --role-name ${IAM_ROLE_NAME} &> /dev/null; then
    # Create IAM role
    aws iam create-role \
        --role-name ${IAM_ROLE_NAME} \
        --assume-role-policy-document '{
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "ec2.amazonaws.com"
                    },
                    "Action": "sts:AssumeRole"
                }
            ]
        }'

    # Attach policies
    aws iam attach-role-policy \
        --role-name ${IAM_ROLE_NAME} \
        --policy-arn arn:aws:iam::aws:policy/AmazonECR-FullAccess

    aws iam attach-role-policy \
        --role-name ${IAM_ROLE_NAME} \
        --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess

    # Create instance profile
    aws iam create-instance-profile --instance-profile-name ${IAM_ROLE_NAME}
    
    # Add role to instance profile
    aws iam add-role-to-instance-profile --instance-profile-name ${IAM_ROLE_NAME} --role-name ${IAM_ROLE_NAME}
    
    # Wait for the profile to be fully created
    echo "Waiting for instance profile to be ready..."
    sleep 10
    
    echo -e "${GREEN}IAM role ${IAM_ROLE_NAME} created and configured.${NC}"
else
    echo -e "${GREEN}IAM role ${IAM_ROLE_NAME} already exists.${NC}"
fi
echo ""

# Create security group if it doesn't exist
echo -e "${BLUE}Creating security group...${NC}"
if ! aws ec2 describe-security-groups --group-names ${SECURITY_GROUP_NAME} &> /dev/null; then
    SECURITY_GROUP_ID=$(aws ec2 create-security-group --group-name ${SECURITY_GROUP_NAME} --description "Security group for NavNote application" --query 'GroupId' --output text)
    echo -e "${GREEN}Security group created with ID: ${SECURITY_GROUP_ID}${NC}"
    
    # Add inbound rules - restrict SSH to current IP
    CURRENT_IP=$(curl -s https://checkip.amazonaws.com)
    aws ec2 authorize-security-group-ingress --group-id ${SECURITY_GROUP_ID} --protocol tcp --port 22 --cidr ${CURRENT_IP}/32
    aws ec2 authorize-security-group-ingress --group-id ${SECURITY_GROUP_ID} --protocol tcp --port 80 --cidr 0.0.0.0/0
    aws ec2 authorize-security-group-ingress --group-id ${SECURITY_GROUP_ID} --protocol tcp --port 443 --cidr 0.0.0.0/0
    aws ec2 authorize-security-group-ingress --group-id ${SECURITY_GROUP_ID} --protocol tcp --port 8000 --cidr 0.0.0.0/0
    echo -e "${GREEN}Inbound rules added to security group. SSH restricted to ${CURRENT_IP}${NC}"
else
    SECURITY_GROUP_ID=$(aws ec2 describe-security-groups --group-names ${SECURITY_GROUP_NAME} --query 'SecurityGroups[0].GroupId' --output text)
    echo -e "${GREEN}Security group ${SECURITY_GROUP_NAME} already exists with ID: ${SECURITY_GROUP_ID}${NC}"
fi
echo ""

# Create user data script
cat > user-data.sh << 'EOF'
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

# The instance will use IAM role permissions - no need to configure AWS credentials

# Login to ECR (using instance role)
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 897722675510.dkr.ecr.us-east-1.amazonaws.com

# Pull Docker images
docker pull 897722675510.dkr.ecr.us-east-1.amazonaws.com/navnote-frontend:latest
docker pull 897722675510.dkr.ecr.us-east-1.amazonaws.com/navnote-backend:latest

# Create a docker-compose.yml file
cat > /home/ec2-user/docker-compose.yml << 'COMPOSE'
version: '3'

services:
  frontend:
    image: 897722675510.dkr.ecr.us-east-1.amazonaws.com/navnote-frontend:latest
    ports:
      - "80:80"
    restart: always
    depends_on:
      - backend

  backend:
    image: 897722675510.dkr.ecr.us-east-1.amazonaws.com/navnote-backend:latest
    ports:
      - "8000:8000"
    restart: always
    environment:
      - AWS_STORAGE_BUCKET_NAME=navnote-static-files-897722675510
      - AWS_S3_REGION_NAME=us-east-1
      - DEBUG=False
      - ALLOWED_HOSTS=*
      # No hardcoded credentials - instance will use IAM role
COMPOSE

# Install docker-compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Start containers
cd /home/ec2-user
docker-compose up -d
EOF

# Launch EC2 instance
echo -e "${BLUE}Launching EC2 instance...${NC}"
INSTANCE_ID=$(aws ec2 run-instances \
    --image-id ${AMI_ID} \
    --instance-type ${INSTANCE_TYPE} \
    --key-name ${KEY_NAME} \
    --security-group-ids ${SECURITY_GROUP_ID} \
    --iam-instance-profile Name=${IAM_ROLE_NAME} \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=${INSTANCE_NAME}}]" \
    --user-data file://user-data.sh \
    --query 'Instances[0].InstanceId' \
    --output text)

echo -e "${GREEN}EC2 instance launched with ID: ${INSTANCE_ID}${NC}"
echo ""

# Wait for instance to be running
echo -e "${BLUE}Waiting for instance to be running...${NC}"
aws ec2 wait instance-running --instance-ids ${INSTANCE_ID}
echo -e "${GREEN}Instance is now running.${NC}"
echo ""

# Create and associate Elastic IP
echo -e "${BLUE}Creating and associating Elastic IP...${NC}"
ALLOCATION_ID=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text)
ELASTIC_IP=$(aws ec2 describe-addresses --allocation-ids ${ALLOCATION_ID} --query 'Addresses[0].PublicIp' --output text)
aws ec2 associate-address --instance-id ${INSTANCE_ID} --allocation-id ${ALLOCATION_ID}
echo -e "${GREEN}Elastic IP ${ELASTIC_IP} associated with instance.${NC}"
echo ""

# Get public IP address
PUBLIC_IP=${ELASTIC_IP}
echo -e "${BLUE}Instance public IP: ${PUBLIC_IP}${NC}"
echo ""

# Save deployment info
echo "# NavNote EC2 Deployment Information" > ec2-deploy-info.txt
echo "INSTANCE_ID=${INSTANCE_ID}" >> ec2-deploy-info.txt
echo "PUBLIC_IP=${PUBLIC_IP}" >> ec2-deploy-info.txt
echo "ELASTIC_IP_ALLOCATION_ID=${ALLOCATION_ID}" >> ec2-deploy-info.txt
echo "KEY_FILE=${KEY_NAME}.pem" >> ec2-deploy-info.txt
echo "SSH_COMMAND=ssh -i ${KEY_NAME}.pem ec2-user@${PUBLIC_IP}" >> ec2-deploy-info.txt

echo -e "${GREEN}Deployment information saved to ec2-deploy-info.txt${NC}"
echo ""

# Clean up
rm -f user-data.sh

echo -e "${BLUE}Next Steps:${NC}"
echo "1. Wait a few minutes for the instance to complete initialization."
echo "2. Access your application at: http://${PUBLIC_IP}"
echo "3. SSH into the instance using: ssh -i ${KEY_NAME}.pem ec2-user@${PUBLIC_IP}"
echo ""

echo -e "${GREEN}Deployment script completed successfully!${NC}" 