PROJECT DESCRIPTION
====================================
Base project structure to build modular web apps with mobile, theming and app store support.

Cool features: 
	- Development web server with file watcher to auto-detect changes and auto-refresh the browser.
	- Ready to use project structure and development / build workflows
	- Optmized builds for production (see below)
	- Support for multiple apps and themes
	- Support for mobile development 

It can be used as a responsive webapp or a mobile app via Phonegap.

You can check the Mobile versions of this project on.

https://build.phonegap.com/apps/396322/share

The app can be deployed to IOS, Android, Windows Phone, Symbian and WebOS devices.
	

Technology: 
	Development Language		:	JavaScript		- the language of the web
	Front End Framework			:	Twitter Bootstrap - Sleek, intuitive, and powerful front-end framework for faster and easier web development
	Web Framework				:	Ember.js		- a framework for creating ambitious web applications
	Data Persistency			:	Ember-Data		- a data persistence library for Ember.js
	Templating:					:	Handlebars.js	- minimal Templating on Steroids
	CSS Stylesheets				:	Sass			- syntactically awesome stylesheets
	HTML manipulation and Ajax	:	jQuery			- makes HTML manipulation, event handling, animation, and Ajax much simpler with an easy-to-use
	Mobile Framework			:	Phonegap		- easily create mobile apps using the web technologies you know and love: HTML, CSS, and JavaScript
	Mobile Packaging			:	Phonegap Build	- Package mobile apps in the cloud

	Server Side Platform		:	Node.js			- a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.
	Web Server:					:	Connect			- high quality middleware for node.js
	Build Tool					: 	Grunt			- in one word: automation. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort
	Package Manager				: 	Bower			- a package manager for the web, created at Twitter
	Dependency Manager:			: 	Require/Neuter	- concatenate files in the "require" order
	Cache Optimization		 	:	grunt-rev		- static file asset revisioning through content hashing
	HTML and CSS Optimization	:	grunt-usemin	- replaces references to non-optimized scripts or stylesheets into a set of HTML files
	JavaScript Compressor		:	UglifyJS		- a fast new JavaScript compressor for Node.js that’s on par with Closure
	CSS Compressor 				:	cssmin 			- a (simple) css minifier with benefits 
	Lint						:	JSHint			- JSHint is a tool to detect errors and potential problems in JavaScript code and can be used to enforce coding conventions
	Testing Framework			:	Mocha			- the fun, simple, flexible JavaScript test framework
	Project Scaffolding			: 	Yeoman / ember-generator

Quick Start
-------

Have a look at:
	/app/scripts/app.js			: main script
	/app/scripts/app-config.js	: configuration and context settings
	/templates					: apps and themes

## Requirements

You will need to have Node.js and Grunt installed

	# Download and install node.js at http://nodejs.org
	
	# Use node.js npm package installer to install Grunt CLI
	$ npm install -g grunt-cli
	
	# Go to the webapp-node-ember directory and use npm and bower to install all dependencies
    $ npm install
    $ bower install

## Running the webapp
	# Use Grunt to run the webapp inside a connect preview server (automatically opens your browser)
    $ grunt server

	# Now go and change some code to see the changes automatically apearing in your browser... 
		 
## Building and optmizing your webapp for production
	# Use Grunt to to build your webapp into the /dist folder 
    $ grunt build

## Useful commands

$ grunt - build for production
$ grunt server - run the preview server while watching changes to directories
$ grunt test - run unit tests for an app

$ bower search - shows all the scripts available
$ bower list - list out the dependencies you have installed for a project
$ bower install <dep>..<depN> - install dependencies
$ bower update <dep> - update a dependency to the latest version available
 