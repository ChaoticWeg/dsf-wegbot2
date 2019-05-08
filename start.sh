#!/bin/bash

thisdir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
pushd thisdir >/dev/null 2>&1

# build and bail out if fail
yarn build
build_ec=$?
[ $build_ec -ne 0 ] && exit $build_ec

# run bot while exit code is non-zero
exitcode=1
while [ $exitcode -ne 0 ]; do
    ts=$(date +%s)
    logfile="logs/${ts}.log"
    yarn start > "${logfile}"
    exitcode=$?
done

