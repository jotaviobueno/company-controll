#!/bin/bash

setup() {
    yarn
    sleep 2
    npx prisma migrate dev
}

test() {
    npx jest --runInBand
}

trap cleanup EXIT
setup
test
cleanup
