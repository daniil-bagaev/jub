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
                }
            }
        },
        prod: {
            tasks: {
                css: {
                    name: 'css'
                }
            }
        },
        dep: {
            tasks: {
                css: {
                    name: 'css'
                }
            }
        },
        build: {
            tasks: {
                css: {
                    name: 'css'
                }
            }
        }
    }
};
