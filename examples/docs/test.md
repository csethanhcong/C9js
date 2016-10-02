### Test Configurations:

- Test with Mocha/Chai
- Auto-run with script in package.json: npm test

(TODO): Add test to all units **Unit Testing**

#### Setup Notes:

- Set default MS Tools: npm config set msvs_version 2012 --global
- Or:
	* Install: 	npm install -g node-gyp
				npm install --global --production windows-build-tools



- "test:single": "istanbul cover -x *.test.js node_modules/mocha/bin/_mocha -- -R spec test/index.test.js",

- ,
    "ghooks": {
      "pre-commit": "npm run test:single && npm run check-coverage"
    }