#!/usr/bin/env sh

git clone https://github.com/rgrannell1/gibbr
cd gibbr
echo alias polo=\'$(pwd -P)/lib/gibbr.js\' >> ~/.bashrc && . ~/.bashrc