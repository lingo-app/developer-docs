#!/bin/sh -l

set -e

pwd
sh -c 'prettier --check "*.js"'