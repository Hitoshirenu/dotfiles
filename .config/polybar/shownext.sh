#!/usr/bin/sh

# First Check which player is running.
FLAG=0

APPS=("cmus mpd")

for APP in $APPS
do
    pat="([^\w-]$APP)"
    if ps ux | grep -P $pat | grep -vq grep; then
        if [ $APP == "cmus" ]; then
            FLAG=1
        elif [ $APP == "mpd" ];then
            FLAG=2
        fi
    fi
done

ICON=""

if [ $FLAG == 1 ] || [ $FLAG == 2 ];then
    echo "$ICON"
else
    echo ""
fi
