#!/bin/bash
set -e

# Read EC2 deployment info
INSTANCE_ID=$(grep INSTANCE_ID ec2-deploy-info.txt | cut -d= -f2)
PUBLIC_IP=$(grep PUBLIC_IP ec2-deploy-info.txt | cut -d= -f2)
KEY_FILE=$(grep KEY_FILE ec2-deploy-info.txt | cut -d= -f2)

echo "Deploying to EC2 instance ${INSTANCE_ID} at ${PUBLIC_IP} using key ${KEY_FILE}"

# Create a docker-compose file without credentials
cat > docker-compose-safe.yml << EOF
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
      # AWS credentials will be provided during deployment
EOF

# Copy the docker-compose file to the EC2 instance
scp -i ${KEY_FILE} -o StrictHostKeyChecking=no docker-compose-safe.yml ec2-user@${PUBLIC_IP}:~/docker-compose.yml

# Create a script to login to ECR and run docker-compose
cat > setup-deploy.sh << EOF
#!/bin/bash
set -e

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 897722675510.dkr.ecr.us-east-1.amazonaws.com

# Pull and start containers
cd ~
docker-compose pull
docker-compose up -d

echo "Deployment completed successfully!"
EOF

# Copy the setup script to the EC2 instance
scp -i ${KEY_FILE} -o StrictHostKeyChecking=no setup-deploy.sh ec2-user@${PUBLIC_IP}:~/setup-deploy.sh

# Execute the setup script on the EC2 instance
ssh -i ${KEY_FILE} -o StrictHostKeyChecking=no ec2-user@${PUBLIC_IP} "chmod +x ~/setup-deploy.sh && ~/setup-deploy.sh"

echo "Deployment to EC2 completed successfully!"
echo "Your application should be available at: http://${PUBLIC_IP}" 