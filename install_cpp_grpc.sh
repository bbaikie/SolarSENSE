#!/bin/bash

# store current directory so we can get back to it
startdir=$(pwd)

# Go to ~/git
cd ~
mkdir -p git
cd git

# clone and install vcpkg package manager on your system using the official instructions
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg integrate install
# install gRPC using vcpkg package manager
./vcpkg install grpc

cd $startdir
