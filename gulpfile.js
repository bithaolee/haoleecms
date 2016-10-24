var gulp = require('gulp');
var md5 = require('gulp-md5-assets');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var exec = require('child_process').exec;
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

gulp.task('webpack', function () {
    exec('webpack -w');
});

gulp.task('js', ['webpack'], function () {
    return gulp.src('public/dist/js/**/*.js')
               .pipe(uglify())
               .pipe(md5(5, 'views/**/*.html'))
               .pipe(gulp.dest('public/dist/js/'));
});

gulp.task('css', function (done) {
    return gulp.src(['public/source/css/**/*.css', 'public/source/css/**/*.less'], {base: 'public'})
               .pipe(less())
               .pipe(cssmin())
               .pipe(md5(5, 'views/**/*.html'))
               .pipe(gulp.dest('public/dist/css/'));
});

gulp.task('production', ['js', 'css']);
