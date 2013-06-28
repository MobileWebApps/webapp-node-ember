//App Config
App.Apps.home = App.App.create({
	id : '_home',
	name : 'Home',
	visible : false,
});

App.Context.Apps[App.Apps.home.id] = App.Apps.home;


// Home Route
App.HomeIndexRoute = Ember.Route.extend({
	setupController : function(controller) {
		// Set the IndexController's `title`
		controller.set('title', "My App");
		controller.set('apps', App.APPS);
	}
});

// Home Controller
App.HomeIndexController = Ember.ArrayController.extend({
	searchApp : function() {
		// Get the todo title set by the "New Todo" text field
		var searchBox = this.get('appSearchBox');
		if (!searchBox.trim()) {
			return;
		}
		// TODO: Search Apps function
	}
});

