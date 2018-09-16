#ngDropdownMulti

<!-- # ngIpStack

[![Build Status](https://travis-ci.org/Nucleus-Inc/ngIpStack.svg?branch=master)](https://travis-ci.org/Nucleus-Inc/ngIpStack)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![npm](https://img.shields.io/npm/v/ngipstack.svg)](https://www.npmjs.com/package/ngipstack)

The unofficial [IpStack](https://ipstack.com/) SDK for AngularJS (AKA Angular 1)

## Requirements

- [Angular.js](http://angularjs.org)

## Installation

### Add library

You can get it on npm.

```shell
$ npm install --save ngIpStack
```

```html
<script type="text/javascript" src="/ngipstack/dist/ngIpStack.min.js"></script>
```
### Add dependency

```javascript
var app = angular.module('myModule', ['ipStack']);
```
## Usage

### Set your api key

```javascript
app.controller('myController', ['$scope', 'requester',
    function myController($scope, requester) {

        requester.setApiKey('your-api-key-ip-stack');

        console.log(requester.getApiKey());

    }
]);
```

### Get your IP Address

```javascript
app.controller('myController', ['$scope', 'requester',
    function myController($scope, requester) {

        requester.setApiKey('your-api-key-ip-stack');

        requester.getIp().then(function(res){

          var myIpAddress = res.data.ip;

          console.log(myIpAddress);

        });

    }
]);
```

## Build

```
$ yarn install
$ gulp build
```

### Tests

- Unit:
 - Uses [Karma](http://karma-runner.github.io) + [Jasmine](http://jasmine.github.io/)
 - Files: `specs/*.spec.js`

```
$ gulp test
``` -->

<!-- This directive gives you a Bootstrap 4 Dropdown with the power of AngularJS directives.

# Features
- Based on Bootstrap's 4 dropdown.
- jQuery is not necessary.
- Seperated your data and the selection data. no modification to the data made.
- Built-in search.
- Complete control on the selected items model to fit it to your requirements.
- Two view options: normal list and checkboxes.
- Pre-selected values.
- Limit selection count.
- Grouping items by property.
- Callback events.
- Translation texts.
- Scrollable list (useful for big lists)
- Keyboard controls

## Demo
http://dotansimha.github.io/angularjs-dropdown-multiselect/

## Dependencies
- required: AngularJS >= 1.5, Bootstrap >= 4.0

- Make sure to add the dependencies before the directive's js file.
- Note: Bootstrap JS file is not needed for the directive, it just uses the CSS file

## Install
1. Download the files
	1. Using npm :
		Just run `npm install angularjs-dropdown-multiselect`
	3. Manually:
		You can download the `.js` file directly or clone this repository
2. Include the file in your app
	- `<script type="text/javascript" src="angularjs-dropdown-multiselect.js"></script>`.
	- You can also use the minfined version (`angularjs-dropdown-multiselect.min.js`).
3. Include the module in angular (i.e. in `app.js`) - `angularjs-dropdown-multiselect`

## Contributing
Issues and PR's are much appreciated. We're currently working on reducing them.
When you create a new PR please make it against the develop branch when adding new features and to the fix branch when fixing small issues instead of master.

## Usage and Documentation
See the documentation and examples in the GitHub pages:
http://dotansimha.github.io/angularjs-dropdown-multiselect/ -->
