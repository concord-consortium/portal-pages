#!/bin/sh

# this will deploy the current public folder to a subfolder in the s3 bucket
# the subfolder is the name of the TRAVIS_BRANCH
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
	echo "skipping deploy to S3: this is a pull request"
	exit 0
fi

if [ "$TRAVIS_BRANCH" = "master" ]; then
  # it is necessary to create the directory before moving the files otherwise
  # `mv` just puts the files of site-redesign directly into _site instead of
  # _site/site-redesign/
  mkdir -p _site
  # the main page and collection pages use this site-redesign from master so it needs
  # to be at the root of the site.  There should be a better solution for this.
  mv dest-portals/site-redesign _site/
else
  # the 2> is to prevent error messages when no match is found
  CURRENT_TAG=`git describe --tags --exact-match $TRAVIS_COMMIT 2> /dev/null`
  if [ "$TRAVIS_BRANCH" = "$CURRENT_TAG" ]; then
    # this is a tag build
    mkdir -p _site/version
    DEPLOY_DIR=version/$TRAVIS_BRANCH
  else
    mkdir -p _site/branch
    DEPLOY_DIR=branch/$TRAVIS_BRANCH
  fi
  mkdir -p _site/$DEPLOY_DIR
  mv dest-portals/site-redesign _site/$DEPLOY_DIR/
  export DEPLOY_DIR
fi
s3_website push --site _site
