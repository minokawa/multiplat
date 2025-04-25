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
    printf "${BLUE} Packing electron for ${platform}.${NOCOLOR}\n"
    npx electron-packager ./dist moon_rocket --platform=win32 --out=./packaged --overwrite
    ;;

  build)
    printf  "\n${GREEN}Linting. ${NOCOLOR}\n"
    npx eslint ./src/*.* ./src/**/*.*

    printf  "\n${GREEN}Transpiling. ${NOCOLOR}\n"
    babel src -d dist
    cp src/index.html dist
    ;;

  *)



  printf  "\n${RED}Option -a requires argument: ${BLUE}package | build ${NOCOLOR}. \n"
  ;;
esac

