#!/bin/bash
set -e

# Function to wait for PostgreSQL
wait_for_postgres() {
  echo "Waiting for PostgreSQL..."
  while ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER > /dev/null 2> /dev/null; do
    echo "PostgreSQL not available yet. Waiting..."
    sleep 1
  done
  echo "PostgreSQL is up and running!"
}

# Wait for PostgreSQL if using it
if [[ $DATABASE_URL == postgresql* ]]; then
  wait_for_postgres
fi

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start application with Gunicorn
echo "Starting application..."
exec gunicorn --bind 0.0.0.0:8000 navnote_backend.wsgi_prod:application 