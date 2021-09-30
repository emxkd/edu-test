#!/bin/sh

NODE_OPTIONS=--max_old_space_size=6144 \
  NODE_ENV=production \
  NODE_PATH=./dist/src \
  node ./dist/src/drivers/rest-api/server.js
