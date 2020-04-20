'use strict';
//This works for Gulp v
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');


gulp.task('sass', function(){

    return gulp.src('./css/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});
gulp.task('sass_watch', function(){
    gulp.watch('./css/*.sass', ['sass']);
});
gulp.task('browser_sync', function(){
    var files = [
        './*.html',
        './css/*.css',
        './img/*.{png, jpg, gif}',
        './js/*.js'
    ];
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});
//Default task
gulp.task('default', ['browser_sync'], function(){
    gulp.start('sass_watch');
});
//Tasks for Building Dist
gulp.task('clean', function(){
    return del(['dist']);
});

gulp.task('copyfonts', function(){
    // ** ?? -> See notes.txt (Watch out with the withspaces within '{..,..,..}')
    gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*.{ttf,woff,eof,svg}*') 
    .pipe(gulp.dest('./dist/webfonts'));
});

gulp.task('imagemin', function(){
    return gulp.src('img/*.{png,jpg,gif}')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('dist/img'));
});
//The functionality of usemin task is hosted in notes.txt file
gulp.task('usemin', function(){
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream
        .pipe(usemin({
            css: [rev()], //Adding 20-character string to the file name, which has already been concatenated and minified (implicitly). 
            html: [function(){return htmlmin({collapseWhitespace: true, removeComments: true})}],
            js: [uglify(), rev()], //uglify doesnt recognize 'let' keyword
            inlinejs: [uglify()],  //inline ???
            inlinecss: [cleanCss(), 'concat']   //inline ???
        }))
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['clean'], function(){//First clean task will execute
    gulp.start('copyfonts', 'imagemin', 'usemin'); //Executed parallely
}); 