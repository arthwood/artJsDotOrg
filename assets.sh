#!/bin/sh

sass stylesheets/sass/docs.sass stylesheets/css/docs.css
sass stylesheets/sass/main.sass stylesheets/css/main.css
sass stylesheets/sass/spec.sass stylesheets/css/spec.css

assetspkg -c config/assets.dev.yml -r . -i 2 --js-bundled ./javascripts/bundled --styles-bundled ./stylesheets/bundled --nm
assetspkg -c config/assets.min.yml -r . --js-bundled ./javascripts/bundled --styles-bundled ./stylesheets/bundled
