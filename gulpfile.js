var gulp = require('gulp');
var concat = require('gulp-concat');
var moreCss = require('gulp-more-css');
var uglify = require('gulp-uglify');

gulp.task('css', function () {
  return gulp.src(['template/css/vendor/*.css', 'template/css/*.css'])
    .pipe(concat('toth.min.css'))
    .pipe(moreCss())
    .pipe(gulp.dest('toth'));
});

gulp.task('js', function () {
  return gulp.src(['template/js/vendor/*.js', 'template/js/*.js'])
    .pipe(concat('toth.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('toth'));
});

gulp.task('default', ['css', 'js']);
