# NavNote

NavNote is a web application for navigation and note-taking.

## Project Structure

- Frontend: React with TypeScript, built with Vite
- Backend: Django with Django REST Framework
- Database: PostgreSQL (in production) / SQLite (in development)
- Deployment: AWS (EC2, ECR, S3)

## Local Development

1. Clone the repository:
   ```
   git clone https://github.com/navNoteUSA/navNoteUSA.github.io.git
   cd navNoteUSA.github.io
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Set up the backend:
   ```
   cd navnote_backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

## AWS Deployment

### Option 1: Manual Deployment

1. Build and push Docker images:
   ```
   # Frontend
   docker build -t 897722675510.dkr.ecr.us-east-1.amazonaws.com/navnote-frontend:latest .
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 897722675510.dkr.ecr.us-east-1.amazonaws.com
   docker push 897722675510.dkr.ecr.us-east-1.amazonaws.com/navnote-frontend:latest

   # Backend
   cd navnote_backend
   docker build -t 897722675510.dkr.ecr.us-east-1.amazonaws.com/navnote-backend:latest .
   docker push 897722675510.dkr.ecr.us-east-1.amazonaws.com/navnote-backend:latest
   ```

2. Deploy to EC2:
   ```
   ./ec2-deploy.sh
   ```

### Option 2: GitHub Actions Deployment

1. Add the following secrets to your GitHub repository:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key

2. Push to the main branch to trigger the deployment:
   ```
   git add .
   git commit -m "Update application"
   git push origin main
   ```

3. The GitHub Actions workflow will:
   - Build and push Docker images to ECR
   - Create or update the EC2 instance
   - Deploy the application to the EC2 instance

4. Access your application at the EC2 instance's public IP address.

## CloudFormation Deployment (Alternative)

For a more comprehensive AWS infrastructure setup, you can use the CloudFormation template:

```
./deploy.sh
```

This will create:
- VPC with public and private subnets
- RDS PostgreSQL database
- ECS cluster with Fargate tasks
- Load balancer
- S3 bucket for static files
- ECR repositories for Docker images

## Troubleshooting

If you encounter issues with the deployment:

1. Check the EC2 instance status:
   ```
   aws ec2 describe-instances --filters "Name=tag:Name,Values=NavNoteInstance" --query "Reservations[0].Instances[0].State.Name"
   ```

2. Check the Docker containers:
   ```
   ssh -i navnote-key.pem ec2-user@<EC2_PUBLIC_IP>
   docker ps
   docker logs <CONTAINER_ID>
   ```

3. Check the GitHub Actions workflow logs in the GitHub repository. 