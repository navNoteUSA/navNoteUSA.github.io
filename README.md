# NavNote - Navigation and Notetaking Application

A full-stack web application for navigation and note-taking, deployed on AWS.

## Architecture

This application consists of:

1. **Frontend**: React/TypeScript application built with Vite
2. **Backend**: Django REST API
3. **Database**: PostgreSQL (RDS)
4. **Storage**: S3 for static files
5. **Container Registry**: ECR for Docker images
6. **Compute**: EC2 for hosting

## Local Development

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.12+
- Docker and Docker Compose
- AWS CLI

### Setting up the development environment

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/navnote.git
   cd navnote
   ```

2. Set up the frontend:
   ```bash
   npm install
   ```

3. Set up the backend:
   ```bash
   cd navnote_backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   ```

4. Start the development servers:
   ```bash
   # In one terminal (for the frontend)
   npm run dev
   
   # In another terminal (for the backend)
   cd navnote_backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   python manage.py runserver
   ```

5. Access the application at http://localhost:3000

## AWS Deployment

This project includes several deployment options:

1. **Simple EC2 Deployment**: Using the `deploy-to-ec2.sh` script
2. **CloudFormation Deployment**: Using `cloudformation-simple.yaml`

### Option 1: Simple EC2 Deployment

```bash
./deploy-to-ec2.sh
```

This script will:
1. Create a CloudFormation stack with all required resources
2. Build and push Docker images to ECR
3. Launch an EC2 instance with the application
4. Associate an Elastic IP for a static address

### Option 2: Manual Deployment

1. Configure AWS CLI:
   ```bash
   aws configure
   ```

2. Create the CloudFormation stack:
   ```bash
   aws cloudformation deploy \
     --template-file cloudformation-simple.yaml \
     --stack-name NavNoteStack \
     --parameter-overrides \
     DBUsername=navnoteadmin \
     DBPassword=your-secure-password \
     DBName=navnotedb \
     --capabilities CAPABILITY_IAM
   ```

3. Build and push Docker images:
   ```bash
   # Get ECR repository URLs
   aws cloudformation describe-stacks --stack-name NavNoteStack --query "Stacks[0].Outputs"
   
   # Login to ECR
   aws ecr get-login-password | docker login --username AWS --password-stdin YOUR_ECR_URL
   
   # Build and push frontend
   docker build -t YOUR_FRONTEND_REPO_URL:latest .
   docker push YOUR_FRONTEND_REPO_URL:latest
   
   # Build and push backend
   cd navnote_backend
   docker build -t YOUR_BACKEND_REPO_URL:latest .
   docker push YOUR_BACKEND_REPO_URL:latest
   ```

4. Launch an EC2 instance using the EC2 console or AWS CLI

## Security Considerations

- **SSH Keys**: Never commit SSH keys to the repository. They are in `.gitignore`, but if you accidentally committed them, rotate them immediately.
- **Environment Variables**: Production environment variables should be set securely through AWS Systems Manager Parameter Store or using environment variables in the EC2 instance.
- **IAM Roles**: The application uses IAM roles for EC2 instances instead of hardcoded credentials.
- **HTTPS**: The application supports HTTPS, but you'll need to configure proper SSL certificates.

## Accessing the Application

After deployment:
1. Web application: http://YOUR_ELASTIC_IP (or your domain if configured)
2. API: http://YOUR_ELASTIC_IP:8000/api/

## Troubleshooting

If you encounter issues:

1. Check the EC2 instance logs:
   ```bash
   ssh -i your-key.pem ec2-user@YOUR_ELASTIC_IP
   sudo docker logs frontend
   sudo docker logs backend
   ```

2. Check CloudFormation events for any deployment failures:
   ```bash
   aws cloudformation describe-stack-events --stack-name NavNoteStack
   ```

## Additional Configuration

### Custom Domain

To use a custom domain:

1. Register a domain in Route 53 or with another provider
2. Create a hosted zone in Route 53
3. Create an A record pointing to your Elastic IP
4. Update the ALLOWED_HOSTS and CORS settings in the backend

### SSL/TLS Certificates

The application is configured to use SSL/TLS, but you'll need to:

1. Obtain certificates (using Let's Encrypt or AWS Certificate Manager)
2. Update the Nginx configuration to use your certificates

## License

This project is licensed under the MIT License - see the LICENSE file for details. 