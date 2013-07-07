require('scripts/platform/*');
require('scripts/platform/model/*');

/**
 * Setup apps, themes and application context
 */
require('scripts/app-config'); 

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
	
	// Creates a resource for each App.id and map routes
	// according to the App.routerMapResource() function
	mapper = this;
	Object.keys(App.appsById).map(function(id) {
		mapper.resource(id, App.appsById[id].routerMapResource);
	});
	
});



/**
 * Application wide route
 *  - renders themes and application layout
 */
App.ApplicationRoute = Ember.Route.extend({
	setupController : function(controller) {
		controller.set('context', App.context);
		controller.set('sideMenuLinks', App.sideMenulinks);
		
	},
	
	renderTemplate : App.context.current_theme.renderTemplate
});


/**
 * Root index route
 *  - redirects to selected app route
 */
App.IndexRoute = Ember.Route.extend({
	redirect : function(app) {
		this.transitionTo(App.context.current_app.get('route'));
	}
});


/**
 * App redirector route
 *  - selects an app and redirects to its route
 */
App.AppsGoRoute = Ember.Route.extend({
	model : function(params) {
		App.context.setCurrentApp(App.appsById[params.app_id]);
		return App.context.current_app;
	},

	redirect : function(app) {
		App.context.setCurrentApp(app);
		this.transitionTo(App.context.current_app.get('route'));
	}
});

