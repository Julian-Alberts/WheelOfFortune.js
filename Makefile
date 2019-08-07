MINIFY = node node_modules/uglify-js/bin/uglifyjs
DIST = dist

build: dist/%.js

release: dist/%.js
	$(MINIFY) -o WheelOfFortune.min.js $(wildcard $(DIST)/*.js) -m
	cp WheelOfFortune.min.js bin/WheelOfFortune.min.js
	mv WheelOfFortune.min.js docs/scripts/WheelOfFortune.min.js

dist/%.js: node_modules
	tsc

node_modules:
	npm install
