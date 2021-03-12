'use strict';
const 
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        debug: false,
        pattern: ['*']
    }),
    modes = [],
    tasks = [],
    rc = new Object();
    rc.path = require('./config/.pathrc.json');
    rc.config = require(rc.path.config.gulp);
    rc.package = require(rc.path.config.package);
    rc.git = require(rc.path.config.git);
for (const [key, value] of Object.entries(rc.config.mode))
    modes.push(key);
for (const [key, val] of Object.entries(rc.config.mode[rc.config.default.mode].tasks))
    tasks.push(key);
const 
    argv = require('yargs')
        .demand(['mode','tasks'])
        .choices('mode', modes)
        .default('mode', rc.config.default.mode)
        .alias('mode', 'm')
        .describe('mode', 'Выбор среды разработки')
        .help('help')
        .alias('help','h')
        .version(rc.package.version)
        .alias('version', 'v')
        .epilog('©' + ' ' + rc.package.year + ' ' + rc.package.author)
        .alias('tasks', 't')
        .describe('tasks', 'Выбор задачи для среды')
        .default('tasks', tasks)
        .array(tasks)
        .argv;
let 
    builder = () => {
        for (let val of tasks) 
            tasker(rc.config.mode[argv.mode].tasks[val], argv.mode+':'+val);
    },
    tasker = (task, taskName) => {
        let arrBeg = [
                gulp.src(task.src)
            ], 
            arrEnd = [
                gulp.dest(task.dest)
            ],
            arr = [];
        arr = arrBeg.concat(task.plugins.concat(arrEnd));
        gulp
            .task(taskName, () => {
                return $.pump(arr);
            });
    },
    gitter = () => {
        gulp
            .task('bump', () => {
                return gulp
                    .src('./package.json')
                    .pipe($.bump({type: rc.git.patch}))
                    .pipe(gulp.dest('./'))
            });
        gulp
            .task('git:add', () => {
                return gulp
                    .src('./')
                    .pipe($.git.add())
            });
        gulp
            .task('git:commit', () => {
                return gulp
                    .src('./')
                    .pipe($.git.commit([rc.git.title+' '+rc.package.version, rc.git.msg], {emitData:true}))
                    .on('data', (data) => {
                        console.log(data)
                    })
            });
        gulp
            .task('git:push', (cb) => {
                $.git.push('origin', 'main', (err) => {
                    if (err) 
                        throw err;
                    });
                cb();
            });
        gulp
            .task('git', gulp.series('bump','git:add','git:commit','git:push'));
    },
    runner = () => {

    };
//builder();
gitter();
