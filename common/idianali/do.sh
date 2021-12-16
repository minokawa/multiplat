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

  build)
    printf  "\n${GREEN}Linting. ${NOCOLOR}\n"
    npx eslint ./src/*.* ./src/**/*.*

    printf  "\n${GREEN}Transpiling. ${NOCOLOR}\n"
    babel src -d dist
    ;;
  *)
    printf  "\n${RED}Option -a requires argument: ${BLUE}build ${NOCOLOR}. \n"
    ;;
esac

