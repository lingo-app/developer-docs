#!/bin/sh -l

set -e

cd ./docs-website
echo 'Running bundler...'
bundle install
echo 'Building developer website...'
bundle exec jekyll clean
bundle exec jekyll build --config _config.yml,_config_dev.yml
echo 'Build successful'

echo "Sending to S3..."
s3Path="s3://developer.lingoapp.com/"
aws s3 sync ./_site $s3Path --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --delete
echo "Uploaded developer site to $s3Path";