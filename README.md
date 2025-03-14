# NavNote

A navigation and note-taking application with frontend and backend components.

## Project Structure

- **Frontend**: React/TypeScript application using Vite as the build tool
- **Backend**: Django/Python REST API with JWT authentication
- **Infrastructure**: AWS CloudFormation, Docker, and GitHub Actions for CI/CD

## Local Development Setup

### Prerequisites

- Node.js (v16+)
- Python (3.10+)
- Docker and Docker Compose (optional, for containerized development)

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-github-username/navNoteUSA.github.io.git
   cd navNoteUSA.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (or copy from `.env.example`):
   ```
   VITE_API_URL=http://localhost:8000/api
   CHOKIDAR_USEPOLLING=true
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd navnote_backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # For Unix/Linux
   # or
   venv\Scripts\activate  # For Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `navnote_backend` directory (or copy from `.env.example`):
   ```
   DEBUG=True
   SECRET_KEY=your-local-development-secret-key
   ALLOWED_HOSTS=localhost,127.0.0.1
   DATABASE_URL=sqlite:///db.sqlite3
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

## Docker Development

To run the application using Docker:

```bash
docker-compose up -d
```

This will start both the frontend and backend services.

## AWS Deployment

### Prerequisites

- AWS CLI installed and configured
- GitHub account
- Required AWS permissions to create resources via CloudFormation

### Automated Deployment via GitHub Actions

1. Fork this repository to your GitHub account.

2. Set up the following GitHub repository secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key ID
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
   - `EC2_SSH_KEY`: Contents of your EC2 private key (for SSH access)

3. Push changes to the `main` branch to trigger the deployment pipeline:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

4. The GitHub Actions workflow will:
   - Build and push Docker images to Amazon ECR
   - Deploy the infrastructure via CloudFormation
   - Update the EC2 instance with the latest Docker images

### Manual Deployment

You can also deploy manually:

1. Run the CloudFormation deployment script:
   ```bash
   ./deploy.sh
   ```

2. Or deploy directly to EC2:
   ```bash
   ./ec2-deploy.sh
   ```

## Security Considerations

- All sensitive credentials and secrets are managed via AWS Secrets Manager or GitHub Secrets
- IAM roles are used for EC2 instances instead of hardcoded credentials
- HTTPS is enforced for production deployments
- Debug mode is disabled in production
- Environment-specific configuration is used for different deployment stages

## Additional Resources

- [Frontend Documentation](docs/frontend.md)
- [Backend API Documentation](docs/backend.md)
- [AWS Infrastructure Documentation](docs/aws.md)

## License

MIT 