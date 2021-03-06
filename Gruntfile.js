'use strict';

// Livereload needs to insert a Javascript snippet in the pages it serves
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var mountFolder = function(connect, dir) {
	return connect.static(require('path').resolve(dir));
};

/**
 * Grunt Configuration 
 */
module.exports = function(grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// configurable paths
	var yeomanConfig = {
		app : 'app',
		dist : 'dist'
	};
	grunt.option('stack', true);

	grunt.initConfig({
				yeoman : yeomanConfig,

				/*
				 * Configures regarde / watch to look for file changes and
				 * trigger relevant tasks
				 */
				watch : {
					emberTemplates : {
						files : '<%= yeoman.app %>/templates/**/*.hbs',
						tasks : [ 'emberTemplates', 'livereload' ]
					},
					coffee : {
						files : [ '<%= yeoman.app %>/scripts/**/*.coffee' ],
						tasks : [ 'coffee:dist' ]
					},
					coffeeTest : {
						files : [ 'test/spec/**/*.coffee' ],
						tasks : [ 'coffee:test' ]
					},
					compass : {
						files : [ '<%= yeoman.app %>/styles/**/*.{scss,sass}' ],
						tasks : [ 'compass:server' ]
					},
					neuter : {
						files : [ '<%= yeoman.app %>/scripts/**/*.js' ],
						tasks : [ 'neuter', 'livereload' ]
					},
					livereload : {
						files : [ '<%= yeoman.app %>/*.html',
								'{.tmp,<%= yeoman.app %>}/styles/**/*.css',
								'<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}' ],
						tasks : [ 'livereload' ]
					}
				},

				/*
				 * Configures grunt-contrib-connect as a web server
				 */
				connect : {
					options : {
						port : 9000,
						// change this to '0.0.0.0' to access the server from
						// outside
						hostname : 'localhost'
					},

					// Custom connect middleware to insert liverelaod snippet in
					// the pages
					// so the browser gets notified when it needs to reload
					livereload : {
						options : {
							middleware : function(connect) {
								return [ lrSnippet,
										mountFolder(connect, '.tmp'),
										mountFolder(connect, 'app') ];
							}
						}
					},

					// Custom connect middleware to mount test pages
					test : {
						options : {
							middleware : function(connect) {
								return [ mountFolder(connect, '.tmp'),
										mountFolder(connect, 'test') ];
							}
						}
					},

					// Custom connect middleware to mount dist folder
					dist : {
						options : {
							middleware : function(connect) {
								return [ mountFolder(connect, 'dist') ];
							}
						}
					}
				},

				/*
				 * Other Plugins
				 */
				// Automatically opens a browser window when the server is up
				open : {
					server : {
						path : 'http://localhost:<%= connect.options.port %>'
					}
				},
				clean : {
					dist : {
						files : [ {
							dot : true,
							src : [ '.tmp', '<%= yeoman.dist %>/*',
									'!<%= yeoman.dist %>/.git*' ]
						} ]
					},
					server : '.tmp'
				},
				jshint : {
					options : {
						jshintrc : '.jshintrc'
					},
					all : [ 'Gruntfile.js',
							'<%= yeoman.app %>/scripts/**/*.js',
							'!<%= yeoman.app %>/scripts/vendor/*',
							'test/spec/**/*.js' ]
				},
				mocha : {
					all : {
						options : {
							run : true,
							urls : [ 'http://localhost:<%= connect.options.port %>/index.html' ]
						}
					}
				},
				coffee : {
					dist : {
						files : [ {
							expand : true,
							cwd : '<%= yeoman.app %>/scripts',
							src : '**/*.coffee',
							dest : '.tmp/scripts',
							ext : '.js'
						} ]
					},
					test : {
						files : [ {
							expand : true,
							cwd : 'test/spec',
							src : '**/*.coffee',
							dest : '.tmp/spec',
							ext : '.js'
						} ]
					}
				},
				compass : {
					options : {
						sassDir : '<%= yeoman.app %>/styles',
						cssDir : '.tmp/styles',
						generatedImagesDir : '.tmp/images/generated',
						imagesDir : '<%= yeoman.app %>/images',
						javascriptsDir : '<%= yeoman.app %>/scripts',
						fontsDir : '<%= yeoman.app %>/styles/fonts',
						importPath : 'app/bower_components',
						httpImagesPath : '/images',
						httpGeneratedImagesPath : '/images/generated',
						httpFontsPath : '/styles/fonts',
						relativeAssets : false
					},
					dist : {},
					server : {
						options : {
							debugInfo : true
						}
					}
				},
				// not used since Uglify task does concat,
				// but still available if needed
				/*
				 * concat: { dist: {} },
				 */
				// not enabled since usemin task does concat and uglify
				// check index.html to edit your build targets
				// enable this task if you prefer defining your build targets
				// here
				/*
				 * uglify: { dist: {} },
				 */
				rev : {
					dist : {
						files : {
							src : [
									'<%= yeoman.dist %>/scripts/**/*.js',
									'<%= yeoman.dist %>/styles/**/*.css',
									'<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp}',
									'<%= yeoman.dist %>/styles/fonts/*' ]
						}
					}
				},
				useminPrepare : {
					html : [ '<%= yeoman.app %>/index.html' ],
					options : {
						dest : '<%= yeoman.dist %>'
					}
				},
				usemin : {
					html : [ '<%= yeoman.dist %>/**/*.html' ],
					css : [ '<%= yeoman.dist %>/styles/**/*.css' ],
					options : {
						dirs : [ '<%= yeoman.dist %>' ]
					}
				},
				imagemin : {
					dist : {
						files : [ {
							expand : true,
							cwd : '<%= yeoman.app %>/images',
							src : '**/*.{png,jpg,jpeg}',
							dest : '<%= yeoman.dist %>/images'
						} ]
					}
				},
				svgmin : {
					dist : {
						files : [ {
							expand : true,
							cwd : '<%= yeoman.app %>/images',
							src : '**/*.svg',
							dest : '<%= yeoman.dist %>/images'
						} ]
					}
				},
				cssmin : {
					dist : {
						files : {
							'<%= yeoman.dist %>/styles/main.css' : [
									'.tmp/styles/**/*.css',
									'<%= yeoman.app %>/styles/**/*.css' ]
						}
					}
				},
				htmlmin : {
					dist : {
						options : {
						/*
						 * removeCommentsFromCDATA: true, //
						 * https://github.com/yeoman/grunt-usemin/issues/44
						 * //collapseWhitespace: true,
						 * collapseBooleanAttributes: true,
						 * removeAttributeQuotes: true,
						 * removeRedundantAttributes: true, useShortDoctype:
						 * true, removeEmptyAttributes: true,
						 * removeOptionalTags: true
						 */
						},
						files : [ {
							expand : true,
							cwd : '<%= yeoman.app %>',
							src : '*.html',
							dest : '<%= yeoman.dist %>'
						} ]
					}
				},
				// Put files not handled in other tasks here
				copy : {
					dist : {
						files : [ {
							expand : true,
							dot : true,
							cwd : '<%= yeoman.app %>',
							dest : '<%= yeoman.dist %>',
							src : [ '*.{ico,txt}', '.htaccess',
									'images/**/*.{webp,gif}', 'styles/fonts/*' ]
						} ]
					}
				},
				concurrent : {
					server : [ 'emberTemplates', 'coffee:dist',
							'compass:server' ],
					test : [ 'coffee', 'compass' ],
					dist : [ 'emberTemplates', 'coffee', 'compass:dist',
							'imagemin', 'svgmin', 'htmlmin' ]
				},
				emberTemplates : {
					options : {
						templateName : function(sourceFile) {
							var templatePath = yeomanConfig.app + '/templates/';
							return sourceFile.replace(templatePath, '');
						}
					},
					dist : {
						files : {
							'.tmp/scripts/compiled-templates.js' : '<%= yeoman.app %>/templates/**/*.hbs'
						}
					}
				},
				neuter : {
					app : {
						options : {
							filepathTransform : function(filepath) {
								return 'app/' + filepath;
							}
						},
						src : '<%= yeoman.app %>/scripts/app.js',
						dest : '.tmp/scripts/combined-scripts.js'
					}
				}
			});

	/**
	 * Renames regarde to watch
	 */
	grunt.renameTask('regarde', 'watch');
	

	/**
	 * SERVER TASK
	 */
	grunt.registerTask('server', function(target) {
		if (target === 'dist') {
			return grunt.task.run(
				[ 'build', 
				  'open', 
				  'connect:dist:keepalive' ]);
		}

		grunt.task.run(
			['clean:server', 
			 'concurrent:server', 
			 'neuter:app', 			// Concatenate javascript in the "require" order
			 'livereload-start', 	// Automatically reloads code changes in the browser
			 'connect:livereload', 	// High quality middleware for node.js
			 'open', 
			 'watch' ]);
	});

	/**
	 * TEST TASK
	 */
	grunt.registerTask('test', 
			['clean:server', 
	         'concurrent:test',
	         'neuter:app', 
	         'connect:test', 
	         'mocha' ]);			// The fun, simple, flexible JavaScript test framework
	

	/**
	 * BUILD TASK
	 * 
	 * Usually, useminPrepare is launched first, then the concat, uglify, cssmin
	 * and requirejs tasks are launched (they will create the minified/revved
	 * version of the referenced files), and then, in the end usemin is
	 * launched.
	 */
	grunt.registerTask('build', 
			['clean:dist',
			 'useminPrepare',
			 'concurrent:dist',
			 'neuter:app', 			// Concatenate files in the "require" order
			 'concat', 
			 'cssmin', 				// A (simple) css minifier with benefits
			 'uglify', 				// A fast new JavaScript compressor for Node.js
			 'copy', 
			 'rev', 				// Static file asset revisioning through content hashing (https://github.com/cbas/grunt-rev)
			 'usemin' ]);			// Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views)
	

	/**
	 * DEFAULT TASK
	 */
	grunt.registerTask('default', 
			['jshint', 				// JSHint is a tool to detect errors and potential problems in JavaScript code and can be used to enforce coding conventions
			 'test', 
			 'build' ]);
};
