#!/bin/bash
#
# This script need to be execute as sudo
#

IMAGE_NAME=stock-manage

docker build -t $IMAGE_NAME ../
docker run -d -p 8080:8080 $IMAGE_NAME
