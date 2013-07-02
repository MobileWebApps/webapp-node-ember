require('scripts/platform/*');
require('scripts/platform/model/*');

// Load Application Wide UI Effects
require('scripts/app-effects');

// Load Themes
require('scripts/themes/theme_iphone_black/*');


// Load Apps
require('scripts/apps/_home/*');
require('scripts/apps/help/*');
require('scripts/apps/hp12c/*');

// Configure Context
App.Context.default_app = App.Apps.home;
App.Context.current_app = App.Context.default_app;

App.Context.default_theme = App.Themes.iphoneBlack;
App.Context.current_theme = App.Context.default_theme;

App.APPS = [ App.Apps.home, App.Apps.hp12c, App.Apps.help ];


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

});

