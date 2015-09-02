#!/bin/sh

sass stylesheets/sass/shared.sass stylesheets/css/shared.css
sass stylesheets/sass/docs.sass stylesheets/css/docs.css
sass stylesheets/sass/main.sass stylesheets/css/main.css
sass stylesheets/sass/spec.sass stylesheets/css/spec.css

assetspkg -c config/assets.dev.yml -r . --js-bundle-to ./javascripts/bundled --css-bundle-to ./stylesheets/bundled --js-no-minify --js-indent 2
assetspkg -c config/assets.min.yml -r . --js-bundle-to ./javascripts/bundled --css-bundle-to ./stylesheets/bundled
