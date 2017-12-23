#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

npm run build-files

# clear old index files to prevent duplicates:
: > index.js
: > index.d.ts

find src -name '*.js' -not -name '*.test.js' | while read -r file; do
  if [[ $file == *"util"* ]]; then continue; fi

  name=$(basename "$file" .js)
  entry="$name/$name"
  if [ ! -f "src/${entry}.js" ]; then continue; fi
  echo "creating typings for $file"
  npm run typings-file -s < "$file" > "lib/$name.d.ts"
  echo "module.exports.$name = require('./lib/$name').default;" >> index.js
  echo "import $name from 'lib/$name'; export var $name;" >> index.d.ts
done
