/*global Ember, DS */

require('scripts/themes/theme_iphone_black/*');

//var App = window.App = Ember.Application.create();
//App.Store = DS.Store.extend({});

require('scripts/platform/*');
require('scripts/platform/model/*');

//Loads Apps
require('scripts/apps/_home/*');
require('scripts/apps/help/*');
require('scripts/apps/hp12c/*');


//Configure Context
App.Context.default_app = App.Apps.home;
App.Context.current_app = App.Context.default_app;

App.APPS = [ App.Apps.home, App.Apps.hp12c, App.Apps.help ]




App.Router.map(function() {
	this.resource("apps", function() {
		this.route("go", {
			path : "/:app_id"
		});
	});

	this.resource('help', function() {});
	this.resource('_home', function() {});
	this.resource('hp12c', function() {});

});

//Defines Templating Structure
App.ApplicationRoute = Ember.Route.extend({
	renderTemplate : function() {
		// Render default outlet
		this.render('theme_iphone_black/layout');

		this.render('theme_iphone_black/header', {
			outlet : 'header',
			into : 'theme_iphone_black/layout'
		})
		, this.render('theme_iphone_black/navbar', {
			outlet : 'navbar',
			into : 'theme_iphone_black/layout'
		})
		, this.render('theme_iphone_black/sidemenu', {
			outlet : 'sidemenu',
			into : 'theme_iphone_black/layout'
		})
		, this.render('theme_iphone_black/footer', {
			outlet : 'footer',
			into : 'theme_iphone_black/layout'
		});
	}
});

/*
App.IndexRoute = Ember.Route.extend({
	model : function() {
		return [ 'red', 'yellow', 'blue' ];
	},
	redirect : function() {
		this.transitionTo('help');
	}

});
*/
