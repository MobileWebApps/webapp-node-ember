//App Config
App.Apps.hp12c = App.App.create({
	id : 'hp12c',
	name : 'HP-12C',
});
App.Context.Apps[App.Apps.hp12c.id] = App.Apps.hp12c;

//Home Route
App.Hp12cRoute = Ember.Route.extend({
	renderTemplate : function() {
		this.render(App.Apps.hp12c.get('indexTemplate'), {
			outlet : 'content'
		});
	}
});