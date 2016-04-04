module.exports = function(grunt){

    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    var autoprefixer = require('autoprefixer-core');
    var path = require("path");

    grunt.loadNpmTasks( "grunt-bake", "grunt-responsive-images", "grunt-tinypng", "grunt-pagespeed", "grunt-project-structure", "grunt-newer");

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // WORKS
        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'dist/assets/css/master.css': 'dist/assets/css/master.css', 
                    'dist/assets/css/style.css': 'dist/assets/css/style.css',
                    'dist/assets/css/header.css': 'dist/assets/css/header.css',
                    'dist/assets/css/footer.css': 'dist/assets/css/footer.css'
                }
            }
        },

        // WORKS
        cssmin: {
            build: {
                'dist/assets/css/master.css' : 'dist/assets/css/master.css',
                'dist/assets/css/style.css' : 'dist/assets/css/style.css',
                'dist/assets/css/header.css' : 'dist/assets/css/header.css',
                'dist/assets/css/footer.css' : 'dist/assets/css/footer.css'
            }
        },

        // WORKS
        sass: {
            build: {
                files: {
                    'dist/assets/css/master.css': 'src/assets/css/master.scss',
                    'dist/assets/css/style.css': 'src/assets/css/style.scss',
                    'dist/assets/css/header.css': 'src/assets/css/header.scss',
                    'dist/assets/css/footer.css': 'src/assets/css/footer.scss'
                }
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    // Force tags to have a closing pair
                    'tagname-lowercase': true,
                    // Force tags to be lowercase
                    'attr-lowercase': true,
                    // Force attribute names to be lowercase e.g. <div id="header"> is invalid
                    'attr-value-double-quotes': true,
                    // Force attributes to have double quotes rather than single
                    'doctype-first': true,
                    // Force the DOCTYPE declaration to come first in the document
                    'spec-char-escape': true,
                    // Force special characters to be escaped
                    'id-unique': true,
                    // Prevent using the same ID multiple times in a document
                    'head-script-disabled': true,
                    // Prevent script tags being loaded in the  for performance reasons
                    'style-disabled': true
                    // Prevent style tags. CSS should be loaded through 
                },
                src: ['src/index.html', 'includes/**/*.html']
            }
        },

        uglify: {
            build: {
                files: {
                    'dist/assets/js/main.min.js': ['src/assets/js/**/*.js']
                }
            }
        },

        // WORKS
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
            },
            main: {
                expand: true,
                flatten: true,
                src: 'dist/assets/css/style.css',
                 dest: 'dist/assets/css/'
            }
        },
        // INCLUDES
        bake: {
            build: {
                options: {
                    content: "src/json/content.json"
                },
                files: {
                    "dist/index.html": "src/index.html",
                    "dist/sidebarTemplate.html": "src/sidebarTemplate.html",
                    "dist/newsroom/index.html": "src/newsroom/index.html",
                    "dist/newsroom/newsOne/index.html": "src/newsroom/newsOne/index.html",
                    "dist/biofuels-and-ingredients/index.html" : "src/biofuels-and-ingredients/index.html",
                    "dist/prices/index.html" : "src/prices/index.html",
                    "dist/master.html" : "src/master.html",
                    "dist/interiorTemplateOne.html" : "src/interiorTemplateOne.html",
                    "dist/interiorTemplateTwo.html" : "src/interiorTemplateTwo.html",
                    "dist/interiorTemplateThree.html" : "src/interiorTemplateThree.html"
                }

            }
        },

// includeSource: {
//   options: {
//     basePath: 'app',
//     baseUrl: 'localhost/fhr_dev/',
//     templates: {
//       html: {
//         js: '<script src="{filePath}"></script>',
//         css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
//       },
//       haml: {
//         js: '%script{src: "{filePath}"}/',
//         css: '%link{href: "{filePath}", rel: "stylesheet"}/'
//       },      
//       scss: {
//         scss: '@import "{filePath}";',
//         css: '@import "{filePath}";',
//       }
//     }
//   },
//   myTarget: {
//     files: {
//       'build/index.html': 'index.tpl.html'
//     }
//   }
// },

        // resisize images to the following sizes with names of sizes as parent folder
        responsive_images: {
            myTask: {
                options: {
                    sizes: [{
                      width: 320,
                    },{
                        width: 640,
                    },{
                        width: 1024,
                    },{
                        width: 1600
                    }]
                },
                files: [{
                    expand: true,
                    src: ['**.{jpg,gif,png}'],
                    cwd: 'src/assets/images/',
                    custom_dest: 'dist/assets/images/{%= width %}/'
                }]
            }
        },

        // RUN A SPEED TEST ON YOUR SITE
        pagespeed: {
          options: {
            nokey: true,
            url: "http://www.kochind.com/"
          },
          prod: {
            options: {
              url: "http://www.kochind.com/",
              locale: "en_GB",
              strategy: "desktop",
              threshold: 80
            }
          },
          paths: { //put different pages under paths
            options: {
              paths: ["http://www.kochind.com/"],
              locale: "en_GB",
              strategy: "desktop",
              threshold: 80
            }
          }
        },

        // GET SCREENSHOTS OF SITE FROM A URL 
        pageres: {
            multipleUrls: {
                options: {
                    urls: ['http://www.kochind.com/', 'http://www.kochind.com/giving/'],
                    sizes: ['1366x768', '1920x1080', '1280x800', '320x568', '1140x900', '1280x1024', '320x480', '1600x900', '768x1024', '1024x768', '1680x1050', '360x640', '1920x1200', '720x1280', '1280x720'],
                    dest: 'RunTests/responsiveImages/responsive/',
                    crop: false
                }
            }
        },

        project_structure: {
            options: {
                root: '/dist/',
                writeJSON: true,
                outputJSON: './project_js_structure/js_structure.json',
                filesArrayJSON: 'filesInThisDir'
                
            }
          },

        newer: {
          options: {
            override: function(detail, include) {
              if (detail.task === 'bake') {
                checkForModifiedImports(detail.path, detail.time, include);
              } else {
                include(false);
              }
            }
          }
        },

        // AUTOUPDATE UPON SAVING
        watch: {
            html: {
                files: ['dist/**/index.html', 'includes/**/*.html'],
                tasks: ['htmlhint', 'bake:build']
            },
            js: {
                files: ['src/assets/js/**/*.js'],
                tasks: ['newer:uglify']
            },
            css: {
                files: ['src/assets/css/**/*.scss'],
                tasks: ['buildcss']
            },
            bake: {
                files: [ '/src/includes/**', 'src/**/*.html' ],
                tasks: "bake:build"
            },
        },



// tinypng: {
//     options: {
//         apiKey: "VJLoQBsUGcXvTpUW0FymH3W1gsodTusY",
//         checkSigs: true,
//         sigFile: 'images/file_sigs.json',
//         summarize: true,
//         showProgress: true,
//         stopOnImageError: true
//     },
//     compress: {
//         files: {
//           'images/tinyPng/foo.min.png': 'images/foo.png'
//         }
//     },
//     compress2: {
//         expand: true, 
//         src: 'images/{foo,bar,baz}.png', 
//         dest: 'images/tinyPng',
//         ext: '.min.png'
//     },
//     compress3: {
//         src: ['{foo,bar,baz}.png', '!*.min.png'],
//         cwd: 'images/',
//         dest: 'images/tinyPng',
//         expand: true,
//         rename: function(dest, src) { 
//             var parts = src.split('/'),
//             fname = path.basename(parts.pop(), ".png");
//             return path.join(dest, fname + '.min.png');
//         }
//     }
//   }

    });

    grunt.registerTask('default', []);
    grunt.registerTask('build', [
        'sass',
        'cssc',
        'autoprefixer',
        'cssmin',
        'htmlhint',
        'uglify',
        'bake:build'
    ]);
    grunt.registerTask('buildcss',  [
        'newer:sass',
        'newer:cssc',
        'newer:autoprefixer',
        'newer:cssmin'
    ]);

};