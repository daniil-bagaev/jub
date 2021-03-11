const 
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['*']
    }),
    rc = {
        git: require('./config/.gitrc'),
        package: require('./package.json'),
        path: require('./config/.pathrc'),
    };
gulp
    .task('git:add', () => {
        return gulp
            .src('./')
            .pipe($.git.add())
    });
gulp
    .task('bump', () => {
        return gulp
            .src('./package.json')
            .pipe($.bump({type: rc.git.patch}))
            .pipe(gulp.dest('./'))
    })
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
    .task('git:push', () => {
        return $.git.push('origin', 'main', (err) => {
            if (err) 
                throw err;
            })
    });
