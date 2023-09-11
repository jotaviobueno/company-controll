#!/bin/bash

setup() {
    yarn
    sleep 2
    npx prisma generate
}

test() {
    npx jest --runInBand
}

trap cleanup EXIT
setup
test
cleanup
