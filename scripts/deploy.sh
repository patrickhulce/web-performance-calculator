#!/bin/bash

NODE_ENV=prod webpack
mv dist/ build/assets/

BRANCH=$(git rev-parse --abbrev-ref HEAD)

git add -A
git checkout -b gh-pages
git commit -m 'deploy to gh-pages'
git subtree push --prefix build/ origin gh-pages
git checkout -f $BRANCH
git branch -D gh-pages
