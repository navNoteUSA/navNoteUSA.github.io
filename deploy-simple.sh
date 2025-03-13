#!/bin/bash
set -e

# Configuration
STACK_NAME="NavNoteSimpleStack"
AWS_REGION=$(aws configure get region)

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}NavNote AWS Deployment Script (Simple Version)${NC}"
echo "============================================="
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

# Deploy CloudFormation stack
echo -e "${BLUE}Deploying CloudFormation stack: ${STACK_NAME}...${NC}"
aws cloudformation create-stack \
    --stack-name ${STACK_NAME} \
    --template-body file://cloudformation-simple.yaml \
    --capabilities CAPABILITY_IAM \
    --region ${AWS_REGION}

echo -e "${GREEN}CloudFormation stack deployment initiated.${NC}"
echo ""

# Wait for stack creation to complete
echo -e "${BLUE}Waiting for stack creation to complete...${NC}"
aws cloudformation wait stack-create-complete --stack-name ${STACK_NAME} --region ${AWS_REGION}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Stack creation completed successfully!${NC}"
    echo ""
    
    # Get outputs from the CloudFormation stack
    echo -e "${BLUE}Retrieving deployment information...${NC}"
    FRONTEND_REPO=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='FrontendRepository'].OutputValue" --output text --region ${AWS_REGION})
    BACKEND_REPO=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='BackendRepository'].OutputValue" --output text --region ${AWS_REGION})
    STATIC_BUCKET=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='StaticBucketName'].OutputValue" --output text --region ${AWS_REGION})
    
    # Save config for future use
    echo "# NavNote AWS Deployment Configuration" > aws-config-simple.txt
    echo "STACK_NAME=${STACK_NAME}" >> aws-config-simple.txt
    echo "AWS_REGION=${AWS_REGION}" >> aws-config-simple.txt
    echo "FRONTEND_REPOSITORY=${FRONTEND_REPO}" >> aws-config-simple.txt
    echo "BACKEND_REPOSITORY=${BACKEND_REPO}" >> aws-config-simple.txt
    echo "STATIC_BUCKET=${STATIC_BUCKET}" >> aws-config-simple.txt
    
    echo -e "${GREEN}Configuration saved to aws-config-simple.txt${NC}"
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
    echo "3. Deploy to EC2 or ECS manually using the Docker images"
    echo ""
    echo -e "${GREEN}Deployment script completed successfully!${NC}"
else
    echo -e "${RED}Stack creation failed. Check the AWS CloudFormation console for details.${NC}"
fi 