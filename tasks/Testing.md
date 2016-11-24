### Test Configurations:

(TODO): Add test to all units **Unit Testing**

#### Setup Notes:

- Set default MS Tools: npm config set msvs_version 2012 --global
- Or:
	* Install: 	npm install -g node-gyp
				npm install --global --production windows-build-tools



- "test:single": "nyc cover -x *.test.js node_modules/mocha/bin/_mocha -- -R spec test/*.test.js --compilers js:babel-register",

- "check-coverage": "istanbul check-coverage --statements 100 --branches 100 --functions 100 --lines 100",

- "test": "mocha test/*.test.js --compilers js:babel-register",

- "cover": "istanbul npm test",

- "watch:test": "npm t -- -w",

- ,
    "ghooks": {
      "pre-commit": "npm run cover && npm run check-coverage"
    }

- Unit Test supports ES6 with NYC code coverage	