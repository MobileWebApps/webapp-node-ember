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

>The app can be deployed to IOS, Android, Windows Phone, Symbian and WebOS devices.
	

#### Technology Used:
----------
###### Language Platform
- [JavaScript] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/JavaScript_Overview) - 
  the language of the web     
- [Google V8]  (https://developers.google.com/v8) -
  Google's high-performance JavaScript engine, written in C++ and used in Google Chrome
- [Node.js] (http://nodejs.org) - 
  a platform built on V8 JavaScript runtime for easily building fast, scalable network applications

###### Front End
- [Ember.js](http://emberjs.com/) - 
  a framework for creating ambitious web applications  
- [Ember-Data](http://emberjs.com/guides/models) - 
  a data persistence library for Ember.js
- [Handlebars.js](http://emberjs.com/guides/templates/the-application-template)	- 
  minimal Templating on Steroids
- [Twitter Bootstrap](http://twitter.github.io/bootstrap) - 
  Sleek, intuitive, and powerful front-end framework for faster and easier web development     
- [Font Awesome](http://twitter.github.io/bootstrap) - 
  Font Awesome gives you scalable vector icons that can instantly be customized
- [Sass](http://sass-lang.com)	- 
  syntactically awesome stylesheets
- [jQuery](http://jquery.com) - 
  makes HTML manipulation, event handling, animation, and Ajax much simpler with an easy-to-use
- [Phonegap](http://phonegap.com) - 
  easily create mobile apps using the web technologies you know and love: HTML, CSS, and JavaScript
- [Phonegap Build](https://build.phonegap.com/)	- 
  package mobile apps in the cloud

###### Development Tools
- [Yeoman](http://yeoman.io/) 				- Project Scaffolding with ember-generator
- [Connect](http://www.senchalabs.org/connect) 		- high quality middleware for node.js
- [Bower](https://github.com/bower/bower) 		- a package manager for the web, created at Twitter
- [Grunt](http://gruntjs.com) 				- in one word: automation. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort
- [Neuter](https://github.com/trek/grunt-neuter) 	- concatenate files in the "require" order
- [grunt-rev](https://github.com/cbas/grunt-rev) 	- cache optimization and static file asset revisioning through content hashing
- [grunt-usemin](https://github.com/yeoman/grunt-usemin)- HTML and CSS Optimization - replaces references to non-optimized scripts or stylesheets into a set of HTML files
- [UglifyJS](http://badassjs.com/post/971960912/uglifyjs-a-fast-new-javascript-compressor-for-node-js) - a fast new JavaScript compressor for Node.js that’s on par with Closure
- [cssmin](https://code.google.com/p/cssmin)		- a (simple) css minifier with benefits 
- [JSHint](http://www.jshint.com/)			- JSHint is a tool to detect errors and potential problems in JavaScript code and can be used to enforce coding conventions
- [Mocha](http://mochajs.org/)		- the fun, simple, flexible JavaScript test framework
- [Google Octane](https://developers.google.com/octane)	- a modern benchmark that measures a JavaScript engine’s performance by running a suite of tests representative of today’s complex and demanding web applications

Quick Start
------------

Have a look at:
- [app/scripts/app.js](app/scripts/app.js)			: main script
- [app/scripts/app-config.js](app/scripts/app-config.js)	: configuration and context settings
- [app/templates](app/templates)				: apps and themes

#### Requirements

You will need to have Node.js and Grunt installed

	# Download and install node.js at http://nodejs.org
	
	# Use node.js npm package installer to install Grunt CLI
	$ npm install -g grunt-cli
	$ npm install -g bower
	
	# Go to the webapp-node-ember directory and use npm and bower to install all dependencies
	$ npm install
	$ bower install

#### Running the webapp
	# Use Grunt to run the webapp inside a connect preview server (automatically opens your browser)
	$ grunt server

	# Now go and change some code to see the changes automatically apearing in your browser... 
		 
#### Building and optmizing your webapp for production
	# Use Grunt to to build your webapp into the /dist folder 
	$ grunt build

#### Useful commands

	$ grunt - build for production
	$ grunt server - run the preview server while watching changes to directories
	$ grunt test - run unit tests for an app
	
	$ bower search - shows all the scripts available
	$ bower list - list out the dependencies you have installed for a project
	$ bower install <dep>..<depN> - install dependencies
	$ bower update <dep> - update a dependency to the latest version available
 
