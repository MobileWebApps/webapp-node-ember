require('scripts/platform/model/*');


//Index Redirector
App.IndexRoute = Ember.Route.extend({
	redirect : function(app) {
		this.transitionTo(App.Context.current_app.get('route'));
	}
});


//App Redirector
App.AppsGoRoute = Ember.Route.extend({
	model : function(params) {
		App.Context.current_app = App.Context.Apps[params.app_id]
		return App.Context.current_app;
	},

	redirect : function(app) {
		App.Context.current_app = app;
		this.transitionTo(App.Context.current_app.get('route'));
	}
});

