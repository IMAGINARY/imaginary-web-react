/* eslint-disable import/no-extraneous-dependencies */

const installConfig = require('./install-config.json');

const source = './events/main.jsx';
const target = 'imaginary_event_components.js';
const targetVendors = 'vendors.js';
const targetDir = `${installConfig.imaginaryWebRoot}/sites/all/modules/imaginary_event/js`;

const gulp = require('gulp');
const browserify = require('browserify');
const sourceStream = require('vinyl-source-stream');
const sourceBuffer = require('vinyl-buffer');
const sourceMaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const gutil = require('gulp-util');

const dependencies = [
  'react',
  'react-dom',
];

function bundleApp() {
  // Browserify will bundle all our js files together in to one and will let
  // us use modules in the front end.
  const appBundler = browserify({
    entries: source,
    debug: true,
  });

  dependencies.forEach((dep) => {
    appBundler.external(dep);
  });

  appBundler
    .transform('babelify', { presets: ['es2015', 'react'], extensions: ['.js', '.es6', '.jsx'] })
    .bundle()
    .on('error', gutil.log)
    .pipe(sourceStream(target))
    .pipe(gulp.dest(targetDir));
}

gulp.task('vendors', () => {
  browserify({
    require: dependencies,
    debug: true,
  })
    .bundle()
    .on('error', gutil.log)
    .pipe(sourceStream(targetVendors))
    .pipe(sourceBuffer())
    .pipe(sourceMaps.init())
    .pipe(minify({
      ext: {
        src: '.js',
        min: '.min.js',
      },
    }))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(targetDir));
});

gulp.task('scripts:dev', () => {
  bundleApp();
});

gulp.task('scripts:prod', () => {
  bundleApp();
});

gulp.task('scripts:watch', () => {
  gulp.watch(['./src/*.jsx'], ['scripts:dev']);
});

gulp.task('default', ['scripts:dev']);
