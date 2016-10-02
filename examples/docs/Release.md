## NPM + Git Configurations

### Author:
	npm init-author-url / author-email / author-name / license (MIT)

### Package:
	npm set save-exact true : Help user to update depedencies if they're missing or out-of-date

### Version: (Release Git )
	git tag 1.0.0
	git push --tags

### Publish: (Release npm)
	npm publish

### Notes:

- Version <x.y.z>: Remember to update version in package.json file
	- *x*: major changes in API, e.g. name of function, functionality
	- *y*: minor changes, e.g. update some functionalities
	- *z*: fix bugs

### Travis: Manage versions and auto-run script before & after publish, auto-test

### Commitizen: Show changelog over commits, control issues, format messages, everything about commit/release phases

### ghooks: Auto-run tests before commit

### istanbul: Code coverage (statements, functions, branches, lines)

- Run: 
	npm run commit
	git push


