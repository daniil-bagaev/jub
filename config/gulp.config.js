'use strict';
const 
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        debug: false,
        pattern: ['*']
    }),
    rc = new Object();
rc.path = require('./.pathrc.json');
module.exports = {
    default: {
        charset: 'UTF-8',
        mode: 'dev'
    },
    mode: {
        dev: {
            tasks: {
                clean: {
                    src: rc.path.build.main,
                    dest: rc.path.build.main,
                    plugins:  [
                        $.clean()
                    ]
                },
                pug: {
                    src: rc.path.dev.pug,
                    dest: rc.path.build.main,
                    plugins: [
                        $.pug({
                            pretty: '\t'
                        })
                    ]
                },
                less: {
                    src: rc.path.dev.less,
                    dest: rc.path.build.css,
                    plugins: [
                        $.less()
                    ]
                },
                js: {
                    src: rc.path.dev.js,
                    dest: rc.path.build.js,
                    plugins: [

                    ]
                }
            }
        },
        prod: {
            tasks: {
                css: {
                    src: rc.path.dev.pug,
                    dest: rc.path.build.main,
                    plugins: []
                }
            }
        },
        dep: {
            tasks: {
                css: {
                    src: rc.path.dev.pug,
                    dest: rc.path.build.main,
                    plugins: []
                }
            }
        },
        build: {
            tasks: {
                css: {
                    src: rc.path.dev.pug,
                    dest: rc.path.build.main,
                    plugins: []
                }
            }
        }
    }
};
