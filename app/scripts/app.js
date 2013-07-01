require('scripts/platform/*');
require('scripts/platform/model/*');

/**
 * Setup apps, themes and application context
 */
require('scripts/app-config'); 

/**
 * Application wide route
 *  - renders themes and application layout
 */
App.ApplicationRoute = Ember.Route.extend({
	renderTemplate : App.Context.current_theme.renderTemplate
});


/**
 * Root index route
 *  - redirects to selected app route
 */
App.IndexRoute = Ember.Route.extend({
	redirect : function(app) {
		this.transitionTo(App.Context.current_app.get('route'));
	}
});


/**
 * App redirector route
 *  - selects an app and redirects to its route
 */
App.AppsGoRoute = Ember.Route.extend({
	model : function(params) {
		App.Context.current_app = App.Context.Apps[params.app_id];
		return App.Context.current_app;
	},

	redirect : function(app) {
		App.Context.current_app = app;
		this.transitionTo(App.Context.current_app.get('route'));
	}
});

