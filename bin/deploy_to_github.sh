#!/usr/bin/env bash
rm -rf dist
npm run build -- --base=react-mongosteen-preview
cd dist
git init
git add .
git commit -m deploy
git remote add origin https://github.com/yejianbing01/react-mongosteen-preview.git
git push -f origin main:main
cd -