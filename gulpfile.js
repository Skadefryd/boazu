// require gulp
var gulp = require('gulp');

// require other packages
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

var dist_dir = './dist/' 

// default task
gulp.task('default', ['scripts', 'styles', 'watch-helper', 'watch']);

// scripts task
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('boazu.js'))
    .pipe(gulp.dest(dist_dir + 'js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(dist_dir + 'js/'));
});

// css task
gulp.task('styles', function() {
  return gulp.src('./src/css/core/core.styl')
    .pipe(stylus())
    .pipe(gulp.dest(dist_dir + 'css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(dist_dir + 'css/'));
});

// nunjucks task
gulp.task('nunjucks', function() {
  return gulp.src('docs/pages**/*.+(html|nunjucks)')
  .pipe(nunjucksRender({
    path: ['docs/templates']
  }))
  .pipe(gulp.dest(dist_dir + 'docs/'))
});

// render component task
// just a testsetup
gulp.task('components', function() {
  return gulp.src('./src/css/components/userprofile/*.+(html|nunjucks)')
  // Adding mockupdata
  .pipe(data(function(){
    return require('./src/css/components/userprofile/data.json');
  }))
  .pipe(nunjucksRender({
    path: ['docs/templates']
  }))
  .pipe(gulp.dest(dist_dir + 'css/components'))
});

// watch helper task
gulp.task('watch-helper', function() {
  return gulp.src('./src/css/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest(dist_dir + 'css/'))
});

// watch task
gulp.task('watch', function(){
  gulp.watch('./src/js/*.js', ['scripts']);
  gulp.watch('./src/css/**/*.styl', ['styles', 'watch-helper']);
});
