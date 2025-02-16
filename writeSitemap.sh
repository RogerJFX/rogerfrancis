#!/bin/bash

file=sitemap.xml
base='https://rogerfrancis.com'

function writeHTMLFile {
  local doc lastMod path num
  num=${1:-1}
  path=$2
  # shellcheck disable=SC2010
  doc="$(ls -1 $path | grep '.html' | awk "NR==$num { print; }")"
  if [ "$doc" != "" ]; then
    echo '  <url>' >> $file
    if [ "$path" != "" ]; then
      echo "    <loc>$base/$path/$doc</loc>" >> $file
      lastMod=$(stat "$path/$doc" | grep 'Mod' | sed -E "s/.+([0-9]{4}-[0-9]{2}-[0-9]{2}).+/\1/")
    else
      echo "    <loc>$base/$doc</loc>" >> $file
      lastMod=$(stat "$doc" | grep 'Mod' | sed -E "s/.+([0-9]{4}-[0-9]{2}-[0-9]{2}).+/\1/")
    fi
    echo "    <lastmod>$lastMod</lastmod>" >> $file
    echo '  </url>' >> $file
    writeHTMLFile $((num+1)) "$path"
  fi
}

function checkHtmlExist() {
  local path found
  path=$1
  # shellcheck disable=SC2010
  found="$(ls -1 "$path" | grep '.html')"
  if [ "$found" != "" ]; then
    echo "$path/$found"
  fi
}

function crawl {
  local path num html dir written
  num=${1:-1}
  path=$2
  written=${3:-'no'}
  if [ "$written" == "no" ]; then
      html=$(checkHtmlExist "$path")
      if [ "$html" != "" ]; then
          writeHTMLFile 1 "$path"
      fi
  fi
  # shellcheck disable=SC2012
  dir="$(ls -1 "$path" | awk "NR==$num { print; }")"
  if [ -d "$path/$dir" ] && [ "$dir" != "" ]; then
    crawl 1 "$path/$dir"
  fi
  if [ "$dir" != "" ]; then
    crawl $((num+1)) "$path" 'yes'
  fi
}

echo '<?xml version="1.0" encoding="UTF-8"?>' > $file
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' >> $file
writeHTMLFile 1
crawl 1 'page'
echo '</urlset>' >> $file
