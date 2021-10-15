!/bin/bash
# turn on bash's job control
set -m

# print env var for checking if container pass in the correct values
env

npm run start:prod

echo
