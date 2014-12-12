module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        concat: {
            options: {
                separator: ";"
            },
            frameworks: {
                src: [
                    "bower_components/jquery/dist/jquery.js",
                    "bower_components/lodash/dist/lodash.js",
                    "bower_components/underscore.string/dist/underscore.string.min.js",
                    "bower_components/cookies-js/src/cookies.js",
                    "bower_components/mousetrap/mousetrap.js",
                    "bower_components/uploader/uploader.js",
                    "bower_components/momentjs/moment.js",
                    "bower_components/url-to/url-to.js",
                    "bower_components/hello/dist/hello.all.js",
                    "bower_components/hello/src/modules/facebook.js",
                    "bower_components/hello/src/modules/google.js",
                    "bower_components/angular/angular.js",
                    "bower_components/angular-animate/angular-animate.js",
                    "bower_components/angular-sanitize/angular-sanitize.js",
                    "bower_components/angular-i18n/angular-locale_ro.js",
                    "bower_components/angular-ui-router/release/angular-ui-router.js",
                    "bower_components/angular-inflector/dist/angular-inflector.js",
                    "bower_components/angular-restmod/dist/angular-restmod-bundle.js",
                    "bower_components/angular-cookies/angular-cookies.js",
                    "bower_components/angular-messages/angular-messages.js",
                    "bower_components/angular-ui-bootstrap/src/bindHtml/bindHtml.js",
                    "bower_components/jstz-detect/jstz.js",
                    "bower_components/humps/humps.js",
                    "bower_components/perfect-scrollbar/src/perfect-scrollbar.js",
                    "bower_components/perfect-scrollbar/src/jquery.mousewheel.js",
                    "bower_components/sugar-date/date.sugar.js",
                    "bower_components/angular-ui-bootstrap/src/position/position.js",
                    "bower_components/angular-ui-bootstrap/src/transition/transition.js",
                    "bower_components/angular-ui-bootstrap/src/bindHtml/bindHtml.js",
                    "bower_components/angular-ui-bootstrap/src/dropdown/dropdown.js",
                    "bower_components/angular-ui-bootstrap/src/tooltip/tooltip.js",
                    "bower_components/angular-ui-bootstrap/src/popover/popover.js",
                    "bower_components/angular-ui-bootstrap/src/modal/modal.js"
                ],
                dest: "build/js/frameworks.js"
            },
            app: {
                src: [
                    "src/app/common/common.js",
                    "src/app/common/**/*.js",

                    "src/app/account/account.js",
                    "src/app/account/**/*.js",

                    "src/app/story/story.js",
                    "src/app/story/**/*.js",

                    "src/app/site/site.js",
                    "src/app/site/**/*.js",

                    "src/app/reminders/reminders.js",
                    "src/app/reminders/**/*.js",

                    "src/app/feedback/feedback.js",
                    "src/app/feedback/**/*.js",

                    "src/app/app.js",
                    "src/app/app.ctrl.js",

                    "build/partials/partials.js"


                ],
                dest: "build/js/app.js"
            }
        },

        ngAnnotate: {
            app: {
                files: {
                    "<%= concat.app.dest %>": "<%= concat.app.dest %>"
                }
            }
        },

        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= pkg.version %> - <%= grunt.template.today('yyyy-dd-mm, h:MM:ss TT') %> */\n"
            },
            dist: {
                files: {
                    "build/js/frameworks.min.js": ["<%= concat.frameworks.dest %>"],
                    "build/js/app.min.js": ["<%= concat.app.dest %>"]
                }
            }
        },

        less: {
            compile: {
                options: {
                    paths: [""]
                },
                files: {
                    "build/css/app2.css": "src/less/bootstrap.less"
                }
            },
            compileAndClean: {
                options: {
                    paths: [""],
                    cleancss: true
                },
                files: {
                    "build/css/app2.min.css": "src/less/bootstrap.less"
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: "expanded",
                    lineNumbers: true
                },
                files: {
                    "build/css/app.css": "src/sass/bootstrap.scss"
                }
            }
        },

        cssmin: {
            minify: {
                options: {
                    keepSpecialComments: 0,
                    banner: "/*! <%= pkg.name %> <%= pkg.version %> - <%= grunt.template.today('yyyy-dd-mm, h:MM:ss TT') %> */"
                },
                expand: true,
                cwd: 'build/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'build/css/',
                ext: '.min.css'
            }
        },

        jshint: {
            files: ["Gruntfile.js", "src/**/*.js"],
            options: {

                // Options here to override JSHint defaults
                globals: {
                    angular: true,
                    jQuery: true,
                    console: true,
                    document: true
                }
            }
        },

        copy: {
            images: {
                expand: true,
                cwd: "src",
                src: ["assets/img/**/*"],
                dest: "build"
            },
            fonts: {
                expand: true,
                cwd: "src",
                src: ["assets/fonts/**/*"],
                dest: "build"
            }
        },

        html2js: {
            options: {
                module: "partials",
                rename: function (modulePath) {

                    // For the Angular UI Bootstrap templates, rewrite the module path
                    if ( modulePath.indexOf("app/common/partials/ui-bootstrap") > -1 ) {
                        return modulePath.replace("app/common/partials/ui-bootstrap", "template");
                    }

                    return modulePath;
                }
            },

            main: {
                src: [

                    "src/app/site/partials/**/*.html",
                    "src/app/reminders/partials/**/*.html",
                    "src/app/feedback/partials/**/*.html",
                    "src/app/account/partials/**/*.html",
                    "src/app/story/partials/**/*.html",
                    "src/app/common/**/*.html"
                ],
                dest: "build/partials/partials.js"
            }
        },

        watch: {
            options: {
                livereload: false
            },
            images: {
                files: ["src/assets/img/**/*"],
                tasks: ["copy:images"]
            },
            fonts: {
                files: ["src/assets/fonts/**/*"],
                tasks: ["copy:fonts"]
            },
            javascript: {
                files: ["Gruntfile.js", "src/**/*.js"],
                tasks: ["concat"]
            },
            partials: {
                files: [
                    "src/app/site/partials/**/*.html",
                    "src/app/account/partials/**/*.html",
                    "src/app/reminders/partials/**/*.html",
                    "src/app/feedback/partials/**/*.html",
                    "src/app/story/partials/**/*.html",
                    "src/app/common/**/*.html"
                ],
                tasks: ["html2js", "concat"]
            },
            sass: {
                files: ["src/**/*.scss"],
                tasks: ["sass"]
            },
            less: {
                files: ["src/**/*.less"],
                tasks: ["less"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ng-annotate");
    grunt.loadNpmTasks("grunt-html2js");

    grunt.registerTask("default", ["html2js", "concat", "sass", "less", "copy"]);
    grunt.registerTask("test", ["jshint"]);
    grunt.registerTask("build", ["html2js", "concat", "ngAnnotate", "uglify", "sass", "cssmin", "copy"]);

};
