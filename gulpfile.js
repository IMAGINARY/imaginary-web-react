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
const envify = require('loose-envify/custom');
const collapse = require('bundle-collapser/plugin');

const dependencies = [
  'react',
  'react-dom',
];

function bundleApp(production) {
  // Browserify will bundle all our js files together in to one and will let
  // us use modules in the front end.

  process.env.NODE_ENV = production ? 'production' : 'development';

  const appBundler = browserify({
    entries: source,
    debug: !production,
  });

  dependencies.forEach((dep) => {
    appBundler.external(dep);
  });

  if (production) {
    appBundler.plugin(collapse);
  }

  appBundler
    .transform('babelify', { presets: ['es2015', 'react'], extensions: ['.js', '.es6', '.jsx'] })
    .transform(envify({
      NODE_ENV: production ? 'production' : 'development',
    }))
    .bundle()
    .on('error', gutil.log)
    .pipe(sourceStream(target))
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
}

gulp.task('vendors', () => {

  process.env.NODE_ENV = 'production';

  browserify({
    require: dependencies,
    debug: false,
  })
    .plugin(collapse)
    .transform(envify({
      NODE_ENV: 'production',
    }))
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
  bundleApp(false);
});

gulp.task('scripts:prod', () => {
  bundleApp(true);
});

gulp.task('scripts:watch', () => {
  gulp.watch(['./src/*.jsx'], ['scripts:dev']);
});

gulp.task('default', ['scripts:dev']);
