//App Config
App.apps.hp12c = App.App.create({
	id : 'hp12c',
	name : 'HP-12C',
});
App.apps.hp12c.register();

require('scripts/apps/hp12c/hp12c-min'); 



// Home Route
App.Hp12cRoute = Ember.Route.extend({
	renderTemplate : function() {
		this.render(App.apps.hp12c.get('indexTemplate'), {
			outlet : 'content'
		});
		Ember.run.scheduleOnce('afterRender', this, function() {
			App.apps.hp12c.calculator.init_hp12c();
		});
		
	}
});