#!/bin/bash
set -e

# Configuration
STACK_NAME="NavNoteStack"
AWS_REGION=$(aws configure get region)
DOMAIN_NAME="navnote.net"
ENVIRONMENT="Production"
DB_INSTANCE_CLASS="db.t3.micro"
DB_NAME="navnotedb"

# Generate a random password for the database
DB_PASSWORD=$(openssl rand -base64 12)
DB_USERNAME="navnoteadmin"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}NavNote AWS Deployment Script${NC}"
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

# Check if stack already exists and delete it if it does
echo -e "${BLUE}Checking if stack already exists...${NC}"
if aws cloudformation describe-stacks --stack-name ${STACK_NAME} &> /dev/null; then
    echo -e "${BLUE}Stack ${STACK_NAME} already exists. Deleting it...${NC}"
    aws cloudformation delete-stack --stack-name ${STACK_NAME}
    echo -e "${BLUE}Waiting for stack deletion to complete...${NC}"
    aws cloudformation wait stack-delete-complete --stack-name ${STACK_NAME}
    echo -e "${GREEN}Stack deleted successfully.${NC}"
fi
echo ""

# Create S3 bucket for CloudFormation template
echo -e "${BLUE}Creating S3 bucket for CloudFormation template...${NC}"
TIMESTAMP=$(date +%s)
BUCKET_NAME="navnote-deployment-${TIMESTAMP}"
if aws s3 mb s3://${BUCKET_NAME} --region ${AWS_REGION}; then
    echo -e "${GREEN}Created S3 bucket: ${BUCKET_NAME}${NC}"
else
    echo -e "${RED}Failed to create S3 bucket. Exiting.${NC}"
    exit 1
fi
echo ""

# Upload CloudFormation template to S3
echo -e "${BLUE}Uploading CloudFormation template to S3...${NC}"
aws s3 cp cloudformation.yaml s3://${BUCKET_NAME}/cloudformation.yaml --region ${AWS_REGION}
TEMPLATE_URL="https://${BUCKET_NAME}.s3.amazonaws.com/cloudformation.yaml"
echo -e "${GREEN}Template uploaded to: ${TEMPLATE_URL}${NC}"
echo ""

# Deploy CloudFormation stack
echo -e "${BLUE}Deploying CloudFormation stack: ${STACK_NAME}...${NC}"
aws cloudformation create-stack \
    --stack-name ${STACK_NAME} \
    --template-url ${TEMPLATE_URL} \
    --capabilities CAPABILITY_IAM \
    --parameters \
        ParameterKey=DomainName,ParameterValue=${DOMAIN_NAME} \
        ParameterKey=Environment,ParameterValue=${ENVIRONMENT} \
        ParameterKey=DBInstanceClass,ParameterValue=${DB_INSTANCE_CLASS} \
        ParameterKey=DBName,ParameterValue=${DB_NAME} \
        ParameterKey=DBUsername,ParameterValue=${DB_USERNAME} \
        ParameterKey=DBPassword,ParameterValue=${DB_PASSWORD} \
    --region ${AWS_REGION}

echo -e "${GREEN}CloudFormation stack deployment initiated.${NC}"
echo ""

# Wait for stack creation to complete
echo -e "${BLUE}Waiting for stack creation to complete (this may take 20-30 minutes)...${NC}"
aws cloudformation wait stack-create-complete --stack-name ${STACK_NAME} --region ${AWS_REGION}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Stack creation completed successfully!${NC}"
    echo ""
    
    # Get outputs from the CloudFormation stack
    echo -e "${BLUE}Retrieving deployment information...${NC}"
    FRONTEND_REPO=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='FrontendRepository'].OutputValue" --output text --region ${AWS_REGION})
    BACKEND_REPO=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='BackendRepository'].OutputValue" --output text --region ${AWS_REGION})
    STATIC_BUCKET=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='StaticBucketName'].OutputValue" --output text --region ${AWS_REGION})
    DB_ENDPOINT=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='DatabaseEndpoint'].OutputValue" --output text --region ${AWS_REGION})
    DB_PORT=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='DatabasePort'].OutputValue" --output text --region ${AWS_REGION})
    LOAD_BALANCER_DNS=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='LoadBalancerDNS'].OutputValue" --output text --region ${AWS_REGION})
    
    # Save config for future use
    echo "# NavNote AWS Deployment Configuration" > aws-config.txt
    echo "STACK_NAME=${STACK_NAME}" >> aws-config.txt
    echo "AWS_REGION=${AWS_REGION}" >> aws-config.txt
    echo "DOMAIN_NAME=${DOMAIN_NAME}" >> aws-config.txt
    echo "FRONTEND_REPOSITORY=${FRONTEND_REPO}" >> aws-config.txt
    echo "BACKEND_REPOSITORY=${BACKEND_REPO}" >> aws-config.txt
    echo "STATIC_BUCKET=${STATIC_BUCKET}" >> aws-config.txt
    echo "DB_ENDPOINT=${DB_ENDPOINT}" >> aws-config.txt
    echo "DB_PORT=${DB_PORT}" >> aws-config.txt
    echo "DB_NAME=${DB_NAME}" >> aws-config.txt
    echo "DB_USERNAME=${DB_USERNAME}" >> aws-config.txt
    echo "DB_PASSWORD=${DB_PASSWORD}" >> aws-config.txt
    echo "LOAD_BALANCER_DNS=${LOAD_BALANCER_DNS}" >> aws-config.txt
    
    echo -e "${GREEN}Configuration saved to aws-config.txt${NC}"
    echo ""

    # Instructions for next steps
    echo -e "${BLUE}Next Steps:${NC}"
    echo "1. Build and push the frontend Docker image:"
    echo "   docker build -t ${FRONTEND_REPO}:latest ."
    echo "   aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${FRONTEND_REPO%%/*}"
    echo "   docker push ${FRONTEND_REPO}:latest"
    echo ""
    echo "2. Build and push the backend Docker image:"
    echo "   cd navnote_backend"
    echo "   docker build -t ${BACKEND_REPO}:latest ."
    echo "   aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${BACKEND_REPO%%/*}"
    echo "   docker push ${BACKEND_REPO}:latest"
    echo ""
    echo "3. Create ECS services for frontend and backend:"
    echo "   aws ecs create-service --cluster ${STACK_NAME}-Cluster --service-name ${STACK_NAME}-frontend --task-definition ${STACK_NAME}-frontend --desired-count 2 --launch-type FARGATE --network-configuration \"awsvpcConfiguration={subnets=[$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`PublicSubnet1`].OutputValue' --output text),$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`PublicSubnet2`].OutputValue' --output text)],securityGroups=[$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`FrontendSecurityGroup`].OutputValue' --output text)],assignPublicIp=ENABLED}\" --load-balancers \"targetGroupArn=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`FrontendTargetGroup`].OutputValue' --output text),containerName=frontend,containerPort=80\""
    echo ""
    echo "   aws ecs create-service --cluster ${STACK_NAME}-Cluster --service-name ${STACK_NAME}-backend --task-definition ${STACK_NAME}-backend --desired-count 2 --launch-type FARGATE --network-configuration \"awsvpcConfiguration={subnets=[$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`PublicSubnet1`].OutputValue' --output text),$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`PublicSubnet2`].OutputValue' --output text)],securityGroups=[$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`BackendSecurityGroup`].OutputValue' --output text)],assignPublicIp=ENABLED}\" --load-balancers \"targetGroupArn=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`BackendTargetGroup`].OutputValue' --output text),containerName=backend,containerPort=8000\""
    echo ""
    echo "4. Update your DNS provider to point the domain ${DOMAIN_NAME} to the load balancer:"
    echo "   ${LOAD_BALANCER_DNS}"
    echo ""
    echo -e "${BLUE}Database Information:${NC}"
    echo "Host: ${DB_ENDPOINT}"
    echo "Port: ${DB_PORT}"
    echo "Database: ${DB_NAME}"
    echo "Username: ${DB_USERNAME}"
    echo "Password: ${DB_PASSWORD} (saved in aws-config.txt for reference)"
    echo ""
    echo -e "${GREEN}Deployment script completed successfully!${NC}"
else
    echo -e "${RED}Stack creation failed. Check the AWS CloudFormation console for details.${NC}"
fi 