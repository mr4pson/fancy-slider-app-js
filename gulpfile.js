var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
// var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
// var notify      = require('gulp-notify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
    html: ['app/index.html'],
    css: ['app/scss/*.scss'],
    script: ['app/js/main.js']
};

gulp.task('mincss', function () {
    return gulp.src(paths.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest('app/css'))
        .pipe(reload({ stream: true }));
});

// ////////////////////////////////////////////////
// HTML 
// ///////////////////////////////////////////////
gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(reload({ stream: true }));
});

// ////////////////////////////////////////////////
// Browser-Sync
// // /////////////////////////////////////////////
gulp.task('browserSync', function () {
    gulp.watch(paths.css, gulp.series(['mincss']));
    gulp.watch(paths.script, gulp.series(['scripts']));
    gulp.watch(paths.html, gulp.series(['html']));
    browserSync({
        server: {
            baseDir: "app"
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('scripts', function () {
    return gulp.src(paths.script)
        // .pipe(coffee())
        .pipe(gulp.dest('app/dist'))
        .pipe(reload({ stream: true }));
});

// gulp.task('watcher', function () {
//     gulp.watch(paths.css, gulp.series(['mincss']));
//     gulp.watch(paths.script, gulp.series(['scripts']));
//     gulp.watch(paths.html, gulp.series(['html']));
// });

gulp.task('default', gulp.series(['mincss', 'scripts', 'browserSync']));