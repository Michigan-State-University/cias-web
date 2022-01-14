# !/bin/bash
# turn on bash's job control
set -m

# print env var for checking if container pass in the correct values
env

# build project and prune ev dependencies
npm run build:and:prune

# start prod build
npm run start:prod

echo
