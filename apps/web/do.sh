#!/bin/bash

BLUE='\033[1;34m'
GREEN='\033[1;32m'
RED='\033[0;31m'
NOCOLOR='\033[0m'

while getopts a:o: flag
do
  case "${flag}" in
    a) act=${OPTARG};;
    o) opt=${OPTARG};;
  esac
done

case $act in

  package)
    printf "${BLUE} Packing webserver as executable.${NOCOLOR}\n"
    pkg ./dist/index.js --config ./conf_pkg.json
    cp ./dist/public ./windows/dist -r
    cp ./.env ./windows
    mkdir -p ./windows/dist/logs
    ;;

  build)
    printf  "\n${GREEN}Linting. ${NOCOLOR}\n"
    npx eslint ./src/*.* ./src/**/*.*

    printf  "\n${GREEN}Transpiling. ${NOCOLOR}\n"
    babel src/*.mjs -d dist
    babel src/frontend -d dist/frontend/
    babel src/libs -d dist/libs/
    babel src/factories -d dist/factories/

    printf  "\n${GREEN}Bundling. ${NOCOLOR}\n"
    NODE_OPTIONS=--openssl-legacy-provider npx webpack;
    ;;

  serve)
    printf  "\n${GREEN}Starting ./dist/web. ${NOCOLOR}\n"
    mkdir -p dist/logs
    node ./dist/index.js
    ;;

  *)
    printf  "\n${RED}Option -a requires argument: ${BLUE}package | build | serve${NOCOLOR}. \n"
    ;;
esac

