'use strict';
const 
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        debug: false,
        pattern: ['*']
    }),
    rc = {};
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
                    isDebug: false,
                    isWatching: true,
                    plugins:  [
                        $.clean()
                    ]
                },
                pug: {
                    src: rc.path.src.pug,
                    dest: rc.path.build.main,
                    isDebug: true,
                    isWatching: true,
                    plugins: [
                        $.pug({
                            pretty: '\t',
                            locals: require(rc.path.config.pug)
                        })
                    ]
                },
                less: {
                    src: rc.path.src.less,
                    dest: rc.path.build.style,
                    isDebug: true,
                    plugins: [
                        $.less(),
                        $.postcss([
                            $.autoprefixer(),
                            $.postcssSorting({
                                'properties-order': 'alphabetical'
                            })
                        ])
                    ]
                },
                js: {
                    src: rc.path.src.js,
                    dest: rc.path.build.script,
                    isDebug: true,
                    isWatching: true,
                    plugins: [

                    ]
                },
                font: {
                    src: rc.path.src.font,
                    dest: rc.path.build.font,
                    isDebug: true,
                    isWatching: false,
                    plugins: [

                    ]
                },
                img: {
                    src: rc.path.src.img.concat(rc.path.src.ignore),
                    dest: rc.path.build.img,
                    isDebug: true,
                    isWatching: false,
                    plugins: [

                    ]
                }
            }
        },
        prod: {
            tasks: {
                css: {
                    src: rc.path.src.pug,
                    dest: rc.path.build.main,
                    isDebug: true,
                    isWatching: true,
                    plugins: []
                }
            }
        },
        dep: {
            tasks: {
                css: {
                    src: rc.path.src.pug,
                    dest: rc.path.build.main,
                    isDebug: true,
                    isWatching: true,
                    plugins: []
                }
            }
        },
        build: {
            tasks: {
                css: {
                    src: rc.path.src.pug,
                    dest: rc.path.build.main,
                    isDebug: true,
                    isWatching: true,
                    plugins: []
                }
            }
        }
    }
};
