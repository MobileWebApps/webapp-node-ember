// Configure Ember
ENV = typeof ENV !== 'undefined' ? ENV : {
  CP_DEFAULT_CACHEABLE: true,
  VIEW_PRESERVES_CONTEXT: true
};


//Creates Ember
var App = window.App = Ember.Application.create({
	  LOG_TRANSITIONS: true
	});

//Creates Ember Data
App.Store = DS.Store.extend({
	  revision: 13,
	  adapter: 'DS.FixtureAdapter'
	});

require('scripts/platform/model/*');
