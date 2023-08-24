const { src, dest, task, series, watch, parallel } = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

task('clean', () => {
  return src('./dist', {read: false}).pipe(clean());
});

task('copy:html', () => {
    return src('src/*.html')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true}));    
});

const styles = [
  'src/css/main.scss'
];

task('styles', () => {
  return src(styles)
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(dest('dist/css'))
    .pipe(reload({ stream: true }));
});



task('scripts', () => {
  return src('src/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('dist/scripts'))
    .pipe(reload({ stream: true }));
});

const images = [
  'src/img/**/*.png',
  'src/img/**/*.svg',
];

task('copy:images', () => {
  return src(images)
    .pipe(dest('dist/img'));
});

task('copy:videos', () => {
  return src('src/mp4/*.mp4')
    .pipe(dest('dist/mp4'));
});

task('copy:fonts', () => {
  return src('src/css/fonts/*')
    .pipe(dest('dist/css/fonts'));
});

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
  });
});

task('watch', () => {
  watch('./src/**/*.scss', series('styles'));
  watch('./src/**/*.js', series('scripts'));
  watch('./src/*.html', series('copy:html'));
});


task('default', series('clean', parallel('copy:images', 'copy:videos', 'copy:fonts', 'copy:html', 'styles', 'scripts'), parallel('watch','server')));