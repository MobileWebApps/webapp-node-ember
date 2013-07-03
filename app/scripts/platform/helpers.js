require('scripts/platform/ember-env');

Handlebars.registerHelper('eachInMap', function(context, options) {
	console.log(context);
	var ret = "";
    for(var _key in context.keys()) {
        ret = ret + options.fn({key:_key,value:context[_key]});
    }
    return ret;
});

Handlebars.registerHelper('eachProperty', function(context, options) {
	console.log(context);
	var ret = "";
    for(var prop in context) {
        ret = ret + options.fn({property:prop,value:context[prop]});
    }
    return ret;
});

Handlebars.registerHelper('noop', function(options) {
	  return options.fn(this);
});

//HELPER: #key_value
//
// Usage: {{#key_value obj}} Key: {{key}} // Value: {{value}} {{/key_value}}
//
// Iterate over an object, setting 'key' and 'value' for each property in
// the object.
Handlebars.registerHelper("key_value", function(obj, fn) {
    var buffer = "",
        key;
 
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            buffer += fn({key: key, value: obj[key]});
        }
    }
 
    return buffer;
});
 
// HELPER: #each_with_key
//
// Usage: {{#each_with_key container key="myKey"}}...{{/each_with_key}}
//
// Iterate over an object containing other objects. Each
// inner object will be used in turn, with an added key ("myKey")
// set to the value of the inner object's key in the container.
Handlebars.registerHelper("each_with_key", function(obj, fn) {
    var context,
        buffer = "",
        key,
        keyName = fn.hash.key;
 
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            context = obj[key];
 
            if (keyName) {
                context[keyName] = key;
            }
 
            buffer += fn(context);
        }
    }
 
    return buffer;
});
