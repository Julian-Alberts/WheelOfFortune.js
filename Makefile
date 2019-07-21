MINIFY = node node_modules/uglify-js/bin/uglifyjs
DIST = dist

build: dist/%.js

release: dist/%.js
	$(MINIFY) -o WheelOfFortune.min.js $(wildcard $(DIST)/*.js) --mangle-props

dist/%.js: node_modules
	tsc

node_modules:
	npm install
