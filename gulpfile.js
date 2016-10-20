var gulp = require('gulp');
var less = require('gulp-less');
// var os = require('os');
// var gutil = require('gulp-util');
// var concat = require('gulp-concat');
// var gulpOpen = require('gulp-open');
// var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var md5 = require('gulp-md5-plus');
// var fileinclude = require('gulp-file-include');
// var clean = require('gulp-clean');
// var webpack = require('webpack');
// var webpackConfig = require('./webpack.config.js');
// var connect = require('gulp-connect');

// var host = {
//     path: 'dist/',
//     port: 3000,
//     html: 'index.html'
// };

// minify css & md5 css path for html
gulp.task('css', function (done) {
    gulp.src(['public/source/css/**/*.css', 'public/source/css/**/*.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(md5(5, 'view/**/*.html'))
        .pipe(gulp.dest('public/dist/css/'))
        .on('end', done);
});

gulp.task('js', function (done) {

});

gulp.task('default', ['css', 'js']);
gulp.task('dev', ['css', 'js']);
