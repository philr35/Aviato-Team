#!/usr/bin/env sh
set -x
npm install -g aws-sdk
set +x

set -x
aws
eco $PATH
set +x

# set -x
# npm run build && aws s3 sync build/ s3://aviato-team
# set +x

