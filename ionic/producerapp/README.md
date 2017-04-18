# upwork

# TODO:
## Find out why there is a dependencies/debug setting in typings.json
## Why are we pulling in "node-sass": "^3.10.0" in package.json

## Prerequisites

* Node.js 4.2.2 or later
* Gulp 3.9.x

## Setup

After cloning the repository (and when a branch is checked out):

* `npm install`

This command installs all of the dependencies of the project.

Expect to see some warnings. They are usually immaterial.

* `typings install`

## ionic command

* `ionic build ios / android`
* `ionic emulate ios / ionic build android`
* `ionic serve` - for development 

## To run the tests, you first need to install the npm dependencies:

npm install karma-jasmine --save-dev

npm install karma-phantomjs-launcher --save-dev

Then add (or update) the following line to karma.config.js
plugins : ['karma-jasmine', 'karma-phantomjs-launcher']

### make sure to have the karma-cli installed
```
  npm install -g karma-cli
```
### Steps to run unit tests:-
* `npm install` (skip if already have installed)
* `npm test`
