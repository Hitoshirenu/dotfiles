#!/usr/bin/sh

# First check the status
PLAYING="status playing"
PAUSED="status paused"

STATUS=$(cmus-remote -Q | grep -i "status")

if [ "$STATUS" == "$PLAYING" ];then
    echo "" 
else
    echo "" 
fi