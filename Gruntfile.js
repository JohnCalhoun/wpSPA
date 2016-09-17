module.exports=function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass:{
            dist:{
                files:{
                    "tmp/style.tmp.css":"style/sass/style.scss"
                },
                style:'compressed'
            }
        },
        concat:{
            css:{
                src:["style/info.txt","tmp/style.tmp.css"],
                dest:"build/bakehard/style.css"
            }
        },
        copy:{
            php:{
                expand:true,
                flatten:true, 
                src:"php/*.php",
                dest:"build/bakehard"
            },
            assets:{
                expand:true,
                src:"assets",
                dest:"build/bakehard/assets"
            },
        },
        clean:{
            options:{
                "no-write":false
            },
            bakehard:['build/bakehard/*'],
            tmp:['tmp/*']
        },
        compress:{
            build:{
                options:{
                    archive:"build/bakehard.zip",
                    mode:"zip"
                },
                files:[
                   {src:['build/bakehard/**']}
                ]
            }
        },
        shell:{
            rsync:{
                command:"rsync -r --delete -e 'ssh -p 18765' ./build/bakehard johnmcal@johnmcalhoun.com:~/public_html/bakehard/wp-content/themes/bakehard",
            }
        },
        browserify:{
            dist:{
                src:"js/main.js",
                dest:"tmp/main.js"
            },
            testConstants:{
                src:"js/constants/test.js",
                dest:"js/constants/data/test.js"
            }
        },
        uglify:{
            dist:{
                files:{
                    "build/bakehard/main.min.js":['tmp/main.js']
                }
            }
        },
        handlebars:{
            compile:{
                options:{
                    namespace:'JST',
                    node:true
                },
                files:{
                    "js/templates/templates.js":"js/templates/*.hb"
                }
            }
        },
        mochaTest:{
            test:{
                options:{
                    timeout:11000
                },
                src:['js/*/runner.js']
            }
        },
        browserSync:{
            js:{
                src:"./js",
                options:{
                    server:{
                        baseDir:"./js",
                        directory:true
                    }
                }, 
            }
        },
        connect:{
            js:{
                options:{
                    port:8000,
                    base:"js"
                }
            }
        },
        "start-selenium-server":{
            dev:{
                options:{
                    autostop:false,
                    downloadUrl:"http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar"
                }
            }
        },
        "stop-selenium-server":{
            dev:{}
        },
        webdriver:{
            dev:{
                configFile:"./wdio.conf.js"
            }
        }
    });

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('style',["sass:dist",
                                "concat:css"])
    grunt.registerTask('php',["copy:php"])
    grunt.registerTask('assets',["copy:assets"])
    grunt.registerTask('js',[   "handlebars",
                                "browserify:dist",
                                "uglify:dist"])
    grunt.registerTask('Clean',["clean:tmp"])
    grunt.registerTask('build',[    'clean:bakehard',
                                    'style',
                                    'php',
                                    'assets',
                                    'js'])
    grunt.registerTask('package',[  'build',
                                    'compress:build'])
    grunt.registerTask('upload',[   'build',
                                    'shell:rsync'])
    grunt.registerTask('test',[ 'connect:js',
                                'start-selenium-server:dev', 
                                'browserify:testConstants',
                                'webdriver:dev',
                                'stop-selenium-server:dev']) 

    grunt.registerTask('default',[])
}






