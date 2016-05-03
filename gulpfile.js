var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var strip = require('gulp-strip-comments');
var pngquant = require('imagemin-pngquant');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);
gulp.task('build', [
  'js-min',
  'js-concat',
  'css-concat',
  'img-min',
  'html-min',
  'html-tmpl-min'
]);

gulp.task('html-min', function() {
  return gulp.src([
    './source/index.html'
  ])
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments : true
  }))
  .pipe(gulp.dest('./www/'));
});

gulp.task('html-tmpl-min', function() {
  return gulp.src([
    './source/templates/*'
  ])
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments : true
  }))
  .pipe(gulp.dest('./www/templates/'));
});

gulp.task('img-min',['fonts'], () => {
  return gulp.src('./source/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./www/img/'));
});

gulp.task('fonts', () => {
  return gulp.src([
    './source/lib/ionic/fonts/*'
  ])
  .pipe(gulp.dest('./www/fonts/'));

});
gulp.task('css-concat', () => {
  return gulp.src([
    './source/lib/ionic/css/ionic.min.css',
    './source/css/style.css'
  ])
  .pipe(minifyCss({
    keepSpecialComments: 2
  }))
  .pipe(concat('css.min.css'))
  .pipe(gulp.dest('./www/css'));
});

gulp.task('js-min', () => {
  return gulp.src([
    './source/js/**/*.js'
  ])
  .pipe(uglify())
  .pipe(concat('my-app.min.js'))
  .pipe(gulp.dest('./source/build/js'));
});

gulp.task('js-concat', function () {
  return gulp.src([
    './source/lib/ionic/js/ionic.bundle.min.js',
    './source/build/js/*.js'
  ])
  .pipe(concat('all.min.js'))
  .pipe(strip())
  .pipe(gulp.dest('./www/js/'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
