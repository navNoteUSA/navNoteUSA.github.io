#!/bin/bash

# Increase file watcher limit temporarily
echo "Increasing file watcher limit..."
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# Run the development server
echo "Starting development server..."
export CHOKIDAR_USEPOLLING=true
npm run dev 