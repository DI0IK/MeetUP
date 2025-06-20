#!/bin/bash

echo "Running start script with user $(whoami) and NODE_ENV $NODE_ENV"
if [ -d "prisma" ]; then
  echo "Syncing Prisma database"
  yarn prisma:generate
  yarn prisma:db:push
fi

yarn swagger:generate
yarn orval:generate

exec yarn dev
