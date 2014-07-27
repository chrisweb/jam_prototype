# Contributing

## Important notes

Please don't edit files in the `dist` subdirectory as they are generated via Grunt. You'll find source code in the `src` subdirectory!

If you want to contribute but don't know what would be helpful then check out the issues section of this project on GitHub.

### Code style

Regarding code style like indentation and whitespace, read the code style documentation/code_styling document.

### Comments

Add as much comments as you can to the code to explain what you did and why you did it.

### Documentation

If you add new features or change existing ones, remember to update the documentation.

Read the documentation/editing_documentation document for more details about how to write documentation.

### Tests

If you alter existing features or add new ones, ensure the test cases are up to date. Don't forget to read the code documentation/testing document.

### Submitting pull requests

* Create a new branch, please don't work in your `master` branch directly.
* Add failing tests for the change you want to make. Run `grunt` to see the tests fail.
* Fix stuff.
* Run `grunt` to see if the tests pass. Repeat steps 2-4 until done.
* Open `test/*.html` unit test file(s) in actual browser to ensure tests pass everywhere.
* Push to your fork and submit a pull request.