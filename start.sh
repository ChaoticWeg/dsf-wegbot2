#!/bin/bash

thisdir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
pushd thisdir >/dev/null 2>&1

# build and bail out if fail
yarn build
build_ec=$?
[ $build_ec -ne 0 ] && exit $build_ec

ts=$(date +%s)

# run bot while exit code is 420 (restart code)
yarn start | tee "logs/${ts}.log"
while [ $? -ne 0 ]; do
    yarn start | tee "logs/${ts}.log"
done

