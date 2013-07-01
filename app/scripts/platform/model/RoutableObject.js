require('scripts/platform/model/Context');

App.RoutableObject = Ember.Object.extend({
	id : null,
	name : 'unnamed',
	visible : true,
	
	location : function() {
		return App.Context.Apps_location + this.get('id');
	}.property('id'),

	indexTemplate : function() {
		return this.get('location') + '/index';
	}.property('location'),

	route : function() {
		return this.get('id');
	}.property('id'),

});