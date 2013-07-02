//App Config
App.Apps.hp12c = App.App.create({
	id : 'hp12c',
	name : 'HP-12C',
});

require('scripts/apps/hp12c/hp12c-min'); 


App.Context.Apps[App.Apps.hp12c.id] = App.Apps.hp12c;

// Home Route
App.Hp12cRoute = Ember.Route.extend({
	renderTemplate : function() {
		this.render(App.Apps.hp12c.get('indexTemplate'), {
			outlet : 'content'
		});
		Ember.run.scheduleOnce('afterRender', this, function() {
			App.Apps.hp12c.calculator.init_hp12c();
		});
		
	}
});