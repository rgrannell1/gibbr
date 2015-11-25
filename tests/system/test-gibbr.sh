#!/usr/bin/env sh

set -e





cli=node_modules/gibbr/cli/gibbr.js




echo ""
echo "-- gibbr system tests --"
echo ""

mkdir -p test0/test

touch test0/test/extension0.foo.bar.baz
touch test0/test/extension1.foo.bar.baz

touch test0/test/extension2.foo.bar.baz
touch test0/test/extension3.foo.bar.baz





echo "# files can be renamed using <path>..."
echo ""

node $cli --size 100 -- \
	"test0/test/extension0.foo.bar.baz" \
	"test0/test/extension1.foo.bar.baz" \
	"test0/test/extension2.foo.bar.baz" \
	"test0/test/extension3.foo.bar.baz"

echo "# files can be renamed using stdio..."
echo ""

find test0/test | tail -n +2 | node $cli --size 100 -- -





echo "# folders can be renamed using <path>..."
echo ""

mkdir -p test1/test0/test0
mkdir -p test1/test0/test1

mkdir -p test1/test1/test0
mkdir -p test1/test1/test1
mkdir -p test1/test1/test2

node $cli --size 100 -- \
	"test1/test0/test0" \
	"test1/test0/test1"





echo "# folders can be renamed using stdio..."
echo ""

find test1/test1 | tail -n +2 | node $cli --size 100 -- -





node tests/system/test-gibbr.js
