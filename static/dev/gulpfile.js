var gulp        =   require('gulp');
var pug         =   require('gulp-pug');
var typescript  =   require('gulp-typescript');
var concat      =   require('gulp-concat');
var browserSync =   require('browser-sync').create();
var tsProject   =   typescript.createProject('./../test/ts/tsconfig.json');

gulp.task('local-pug-compile', () => {

    return gulp.src(['*.pug', './local/pug/**/*.pug'])
            .pipe(pug().on('error', error => {

                console.log('Error on local PUG source compilation: ' + error);

            }))
            .pipe(gulp.dest('./../dist/local'));

});

gulp.task('local-typescript-compile', () => {

    return gulp.src(['*.ts','./local/typescript/**/*.ts'])
            .pipe(tsProject().on('error', error => {

                console.log('Erron on local typescript source compilation: ' + error);
                
            }))
            .pipe(gulp.dest('./../dist/local/ext/js'));

});

gulp.task('remote-pug-compile', () => {

    return gulp.src(['*.pug', './remote/pug/**/*.pug'])
            .pipe(pug().on('error', error => {

                console.log('Error on remote PUG source compilation: ' + error);

            }))
            .pipe(gulp.dest('./../dist/remote'));

});

gulp.task('remote-typescript-compile', () => {

    return gulp.src(['*.ts','./remote/typescript/**/*.ts'])
            .pipe(tsProject().on('error', error => {

                console.log('Erron on remote typescript source compilation: ' + error);
                
            }))
            .pipe(gulp.dest('./../dist/remote/ext/js'));

});

gulp.task('monitor', () => {

    gulp.watch(['*.ts', './local/typescript/**/*.ts'],    gulp.series('local-typescript-compile'));
    gulp.watch(['*.pug', './local/pug/**/*.pug'],         gulp.series('local-pug-compile'));
    //gulp.watch('./../dist/local/**/*.html',               browserSync.reload);
    // browserSync.init({
    //     server: {
    //         baseDir:    './../dist/local'
    //     }
    // });
    // gulp.watch(['*.ts', './remote/typescript/**/*.ts'],    gulp.series('remote-typescript-compile'));
    // gulp.watch(['*.pug', './remote/pug/**/*.pug'],         gulp.series('remote-pug-compile'));
    // gulp.watch('./../dist/remote/**/*.html',               browserSync.reload);
    // browserSync.init({
    //     server: {
    //         baseDir:    './../dist/remote'
    //     }
    // });

});

gulp.task('default', gulp.series('monitor'));