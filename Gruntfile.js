module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dev: {
                files: {
                    'app/scripts/vendor.min.js': ['node_modules/jquery/dist/jquery.js', 'node_modules/angular/angular.js', 'node_modules/angular-animate/angular-animate.js', 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js', 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js', 'third_party_lib/angular-ui-router/angular-ui-router.js','third_party_lib/ngStorage/ngStorage.js', 'node_modules/angular-resource/angular-resource.js', 'third_party_lib/lodash/lodash.min.js','third_party_lib/angular-notify/angular-notify.min.js',  'node_modules/angular-ui-mask/dist/mask.min.js'
                    ],
                    'app/scripts/script.min.js': ['app/scripts/config/config.js', 'app/common/services/common.services.js', 'app/common/services/*.js', 'app/common/directive/*.js', 'app/scripts/app/*.js', 'app/scripts/controllers/*.js','app/scripts/controllers/Administrator/*.js','app/scripts/controllers/User/*.js',
                                                  'app/json_server_files/*.js'
                    ]
                },
                options: {
                    mangle: false,
                    beautify: true,
                    compress: false
                }
            },
            debug: {
                files: {
                    'dist/scripts/vendor.min.js': ['node_modules/angular/angular.js'],
                    'dist/scripts/script.min.js': ['app/scripts/*.js', 'app/scripts/controllers/*.js']//why to add internal folder explicitly when parent is already added
                },
                options: {
                    mangle: false,
                    beautify: true,
                    compress: false
                }
            },
            prod: {
                files: {
                    'dist/scripts/vendor.min.js': ['node_modules/angular/angular.js'],
                    'dist/scripts/script.min.js': ['app/scripts/*.js', 'app/scripts/controllers/*.js']//why to add internal folder explicitly when parent is already added
                },
                options: {
                    mangle: false,
                    beautify: false,
                    compress: true
                }
            }
        },
        cssmin: {

            dev: {
                files: {
                    'app/styles/css/vendor.min.css': ['third_party_lib/angular-notify/angular-notify.min.css', 'third_party_lib/bootstrap/bootstrap.min.css'],
                    'app/styles/css/main.min.css': ['app/styles/css/prefix/main-prefix.css'],
                    'app/styles/css/login.min.css': ['app/styles/css/prefix/login-prefix.css'],
                    
                }
            },
            debug: {
                files: {
                    'dist/styles/vendor.min.css': ['node_modules/bootstrap/dist/css/bootstrap.min.css'],
                    'dist/styles/styles.min.css': ['app/styles/css/*.css']
                }
            },
            prod: {
                options: {
                    keepSpecialComments: 0
                },
                files: {
                    'dist/styles/vendor.min.css': ['node_modules/bootstrap/dist/css/bootstrap.min.css'],
                    'dist/styles/styles.min.css': ['app/styles/css/*.css']
                }
            },
            img: {
                files: {

                    'app/styles/styles1.min.css': ['app/styles/styles.min.css']
                }
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'app/styles/scss/main/',
                    src: ['*.scss'],
                    dest: 'app/styles/sass-process/main',
                    ext: '.css'
                }, {
                    expand: true, 
                    cwd: 'app/styles/scss/login/',
                    src: ['*.scss'],
                    dest: 'app/styles/sass-process/login',
                    ext: '.css'
                }]
            },
            debug: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: "app/styles/scss",
                    src: ["**/*.scss"],
                    dest: "app/styles/css",
                    ext: ".css"
                }]
            },
            prod: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: "app/styles/scss",
                    src: ["**/*.scss"],
                    dest: "app/styles/css",
                    ext: ".css"
                }]
            }
        },
        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'app/index.html'
                }
            },
            debug: {
                files: {
                    'dist/index.html': 'app/index.html'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['app/common/services/*.js', 'app/scripts/app/*.js', 'app/scripts/controllers/*.js'
                ],
                tasks: ['clean:script', 'uglify:dev', 'includeSource:dev']
            },
            css: {
                files: ['app/styles/scss/*/*.scss'],
                tasks: ['sass:dev', 'concat:main', 'concat:login', 'autoprefixer', 'cssmin:dev', 'clean:all']
            }
        },
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    bases: ['app/'],
                    livereload: true
                }
            }
        }, //The autoprefixer task
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'chrome 53', 'firefox 48', 'ie 11', 'ie 10', 'ie 9']
            },

            all: {
                files: {
                    'app/styles/css/prefix/login-prefix.css': 'app/styles/css/login/*.css',
                    'app/styles/css/prefix/main-prefix.css': 'app/styles/css/main/*.css',
               }
            }


        },
        clean: {
            all: {
                src: ['app/styles/css/login',  'app/styles/css/main', 'app/styles/css/prefix', 'app/styles/sass-process'],
            },
            script: {
                src: ['app/scripts/*.js']
            }
        },//app/styles/css/prefix what is this?
        concat: {

            main: {
                src: ['app/styles/sass-process/main/*.css'],
                dest: 'app/styles/css/main/scss-css-main.css'
            },
            login: {
                src: ['app/styles/sass-process/login/*.css'],
                dest: 'app/styles/css/login/scss-css-login.css'
            }    

        },
        ngconstant: {
            options: {
                name: 'config',
                dest: 'app/scripts/config/config.js',
                constants: {
                    'CONFIG': grunt.file.readJSON('app/scripts/config/config.json')
                },
                values: {
                    debug: true
                }
            },
            build: {}
        },
        includeSource: {
            options: {
                basePath: 'app',
                templates: {
                    html: {
                        js: '<script src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
                    }
                }
            },
            dev: {
                files: {
                    'app/index.html': 'app/index.tpl.html'
                }
            }
        }
    });
    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-include-source');


    // Register task(s).
    grunt.registerTask("default", ['clean:script', 'uglify:dev', 'sass:dev', 'concat:main', 'concat:login', 'autoprefixer', 'cssmin:dev', 'clean:all','ngconstant', 'includeSource:dev']);
    grunt.registerTask("debug", ['uglify:debug', 'sass:debug', 'concat:all', 'autoprefixer', 'clean:all', 'cssmin:debug', 'htmlmin:debug']);
    grunt.registerTask("build", ['uglify:prod', 'sass:prod', 'concat:all', 'autoprefixer', 'clean:all', 'cssmin:prod', 'htmlmin:prod']);
    grunt.registerTask("serve", ['express', 'watch']);
};
