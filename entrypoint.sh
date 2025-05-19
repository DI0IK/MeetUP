#!/bin/bash

echo "Running start script with user $(whoami) and NODE_ENV $NODE_ENV"
if [ "$NODE_ENV" == "production" ]; then
  if [ -d "prisma/migrations" ]; then
    echo "Running Prisma migrations"
    npx prisma migrate deploy
  fi
fi
exec node server.js
