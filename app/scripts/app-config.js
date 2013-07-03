//Log Device Browser
console.debug('Browser:',navigator.userAgent);

//Load Components
require('scripts/platform/**/*');
require('scripts/components/**/*');
require('scripts/themes/**/*');
require('scripts/apps/**/*');


// Load Application Wide UI Effects
require('scripts/app-effects');


// Configure Context
App.Context.default_app = App.Apps.home;
App.Context.current_app = App.Context.default_app;

App.Context.default_theme = App.Themes.iphoneBlack;
App.Context.current_theme = App.Context.default_theme;

App.Context.showNavbar = false;
App.Context.footerNavbar = false;

App.APPS = [ App.Apps.home, App.Apps.hp12c, App.Apps.help, App.Apps.maps ];


/**
 * Router Map
 *  - defines routes required by Apps and Themes
 */
App.Router.map(function() {
	this.resource("apps", function() {
		this.route("go", {
			path : "/:app_id"
		});
	});

	
	this.resource('help', function() {
	});
	this.resource('_home', function() {
	});
	this.resource('hp12c', function() {
	});
	this.resource('maps', function() {
	});

});

