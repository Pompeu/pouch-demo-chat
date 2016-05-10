#!/bin/bash
while true ; do
  find `pwd` |
  grep -v "/.git/" |
  grep -v "/lib/" |
  grep -v "/node_modules/" |
  grep -E "[.]js|html$" |
  entr -d sh -c "tput reset;gulp js-min &&  gulp js-concat && gulp build ;echo;date"
done
