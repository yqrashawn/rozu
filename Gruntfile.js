module.exports = function (grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON("package.json"),
		babel: {
			options: {
				sourceMap: false
			},
			dist: {
				files: {
					"lib/app.js": "lib/app.es6.js"
				}
			}
		},
		concat : {
			options : {
				banner : "/**\n" +
				         " * <%= pkg.description %>\n" +
				         " *\n" +
				         " * @copyright <%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
				         " * @link <%= pkg.homepage %>\n" +
				         " * @module <%= pkg.name %>\n" +
				         " * @version <%= pkg.version %>\n" +
				         " */\n"
			},
			dist : {
				src : [
					"src/intro.js",
					"src/regex.js",
					"src/clone.js",
					"src/deferred.js",
					"src/iterate.js",
					"src/log.js",
					"src/merge.js",
					"src/stores.js",
					"src/cache.js",
					"src/password_compare.js",
					"src/password_create.js",
					"src/collection.js",
					"src/collection_delete.js",
					"src/collection_item.js",
					"src/collection_read.js",
					"src/collection_update.js",
					"src/load.js",
					"src/login.js",
					"src/new_user.js",
					"src/notify.js",
					"src/profile.js",
					"src/rate.js",
					"src/register.js",
					"src/schedule.js",
					"src/user.js",
					"src/verify.js",
					"src/receive.js",
					"src/send.js",
					"src/serialize.js",
					"src/validation.js",
					"src/routes.js",
					"src/init.js",
					"src/outro.js"
				],
				dest : "lib/app.es6.js"
			}
		},
		eslint: {
			target: ["lib/app.es6.js"]
		},
		jsdoc : {
			dist : {
				src: ["lib/app.js", "README.md"],
				options: {
				    destination : "doc",
				    template    : "node_modules/ink-docstrap/template",
				    configure   : "docstrap.json",
				    "private"   : false
				}
			}
		},
		mochaTest : {
			options: {
				reporter: "spec"
			},
			test : {
				src : ["test/*_test.js"]
			}
		},
		sed : {
			version : {
				pattern : "{{VERSION}}",
				replacement : "<%= pkg.version %>",
				path : ["<%= concat.dist.dest %>"]
			}
		},
		watch : {
			js : {
				files : "<%= concat.dist.src %>",
				tasks : "default"
			},
			pkg: {
				files : "package.json",
				tasks : "default"
			},
			readme : {
				files : "README.md",
				tasks : "default"
			}
		}
	});

	// tasks
	grunt.loadNpmTasks("grunt-sed");
	grunt.loadNpmTasks("grunt-jsdoc");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-mocha-test");
	grunt.loadNpmTasks("grunt-nsp-package");
	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-eslint");

	// aliases
	grunt.registerTask("build", ["concat", "sed", "babel"]);
	grunt.registerTask("test", ["eslint", "mochaTest"]);
	grunt.registerTask("default", ["build", "test"]);
	grunt.registerTask("validate", "validate-package");
	grunt.registerTask("package", ["validate", "default", "test", "jsdoc"]);
};