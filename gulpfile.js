'use strict';

// modules
var assemble = require('fabricator-assemble');
var browserSync = require('browser-sync');
var del = require('del');
var gulp = require('gulp');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var webpack = require('webpack');

var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var path = require('path');

// Deployment
var fs = require('fs');

var guidify = require("guidify");

// configuration
var config = {
  build: $.util.env.build,
  baseDir : path.join(__dirname, '../'),
  src: {
    scripts: {
      fabricator: './src/assets/fabricator/scripts/fabricator.js',
      toolkit: './src/assets/toolkit/scripts/toolkit.js',
      plugins: './src/assets/toolkit/scripts/plugins/*',
      all: './src/assets/toolkit/scripts/**/*'
    },
    styles: {
      fabricator: 'src/assets/fabricator/styles/fabricator.scss',
      toolkit: 'src/assets/toolkit/styles/toolkit.scss',
    },
    fonts: {
      fabricator: 'src/assets/fabricator/fonts/**/*',
      toolkit: 'src/assets/toolkit/fonts/**/*',
    },
    images: 'src/assets/toolkit/images/**/*',
    sounds: 'src/assets/toolkit/sounds/**/*',
    views: 'src/toolkit/views/*.html',
    icons: 'src/assets/toolkit/icons/**/*'
  },
  dest: 'dist'
};


// webpack
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);

gulp.task('version', function() {
  fs.writeFile('src/data/data.yml', 'version: ?v='+guidify(), (error) => {});
});

// Icons
gulp.task('icons', function () {
  return gulp.src(config.src.icons)
    .pipe(gulp.dest(config.dest + '/assets/toolkit/icons'));
});

// clean
gulp.task('clean', function (cb) {
  del([config.dest], cb);
});

// styles
gulp.task('styles:fabricator', function () {
  gulp.src(config.src.styles.fabricator)
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.if(!config.build, $.csso()))
    .pipe($.rename('f.css'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.dest + '/assets/fabricator/styles'))
    .pipe($.if(!config.build, reload({stream:true})));
});

var options = {};

gulp.task('styles:toolkit', function () {
  var s = $.size();
  var sg = $.size({
        gzip: true
      });

  gulp.src(config.src.styles.toolkit)
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer('last 1 version'))
    .pipe($.csso())
    .pipe($.cssnano({
      discardComments: {removeAll: true},
      zindex: false
    }))
    //.pipe($.if(!config.dev, $.csso()))
    //.pipe($.if(config.dev, $.sourcemaps.write()))
    .pipe(s)
    .pipe(sg)
    .pipe(gulp.dest(config.dest + '/assets/toolkit/styles'))
    .pipe($.notify({
          onLast: true,
          gzip:true,
          message: function(){ return 'Normal: '+s.prettySize  +' gzip: ' + sg.prettySize; },
          title: "Toolkit total style size"
      }))

    .pipe($.if(!config.build, reload({stream:true})));

});


gulp.task('styles', ['styles:fabricator', 'styles:toolkit']);


// scripts
gulp.task('scripts', function (done) {
  gulp.src('dist/assets/toolkit/scripts/toolkit.js')
    .pipe($.size())
    .pipe($.size({
          gzip: true
        }))

  webpackCompiler.run(function (error, result) {
    if (error) {
      $.util.log($.util.colors.red(error));
    }
    result = result.toJson();
    if (result.errors.length) {
      result.errors.forEach(function (error) {
        $.util.log($.util.colors.red(error));
      });
    }
    done();
  });
});


gulp.task('assets', function(){
  return gulp.src(config.baseDir +'uikit/dist/assets/toolkit/**/*')
    .pipe(gulp.dest(config.baseDir +'auctions-web/src/main/resources/assets/'))
});

gulp.task('html', function () {
  return gulp.src(config.dest +"/*.html")
      .pipe($.htmlhint({'attr-lowercase':false}))
      .pipe($.htmlhint.reporter());
});

// images
gulp.task('images', ['favicon'], function () {
  return gulp.src(config.src.images)
    .pipe($.imagemin())
    .pipe(gulp.dest(config.dest + '/assets/toolkit/images'));
});

gulp.task('sounds', function () {
  return gulp.src(config.src.sounds)
    .pipe(gulp.dest(config.dest + '/assets/toolkit/sounds'));
});

gulp.task('favicon', function () {
  return gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.dest));
});

gulp.task('fonts:fabricator',  function () {
  return gulp.src(config.src.fonts.fabricator)
    .pipe(gulp.dest(config.dest + '/assets/fabricator/fonts'));
});

gulp.task('fonts:toolkit',  function () {
  return gulp.src(config.src.fonts.toolkit)
    .pipe(gulp.dest(config.dest + '/assets/toolkit/fonts'));
});

gulp.task('fonts', ['fonts:toolkit', 'fonts:fabricator']);

gulp.task('plugins',  function () {
  return gulp.src(config.src.scripts.plugins)
    .pipe($.minify({
      ext:{
        min:'-m.js'
      }
    }))
    .pipe(gulp.dest(config.dest + '/assets/toolkit/scripts/'));
});


//assemble
gulp.task('assemble', function (done) {
  assemble({
    logErrors: true
  });
  done();
});

// serve
gulp.task('serve', ['version'], function () {
  browserSync({
    server: {
      baseDir: config.dest
    }
  },(err, bs) => {

});

  function webpackCache(e) {
    var keys = Object.keys(webpackConfig.cache);
    var key, matchedKey;
    for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      key = keys[keyIndex];
      if (key.indexOf(e.path) !== -1) {
        matchedKey = key;
        break;
      }
    }
    if (matchedKey) {
      delete webpackConfig.cache[matchedKey];
    }
  }

  gulp.task('assemble:watch', ['assemble'], reload);
  gulp.watch('src/**/*.{html,md,json,yml}', ['assemble:watch']);

  gulp.task('styles:fabricator:watch', ['styles:fabricator']);
  gulp.watch('src/assets/fabricator/styles/**/*.scss', ['styles:fabricator:watch']);

  gulp.task('styles:toolkit:watch', ['styles:toolkit']);
  gulp.watch('src/assets/toolkit/styles/**/*.scss', ['styles:toolkit:watch']);

  gulp.task('scripts:watch', ['scripts'], reload);
  gulp.watch('src/assets/{fabricator,toolkit}/scripts/**/*.js', ['scripts:watch']).on('change', webpackCache);

  gulp.task('images:watch', ['images'], reload);
  gulp.watch(config.src.images, ['images:watch']);

  gulp.task('fonts:watch', ['fonts']);
  gulp.watch(config.src.fonts.fabricator, ['fonts:watch']);
  gulp.watch(config.src.fonts.toolkit, ['fonts:watch']);

  gulp.task('icons:watch', ['icons']);
  gulp.watch(config.src.icons, ['icons:watch']);

});


// default build task
gulp.task('default', ['clean'], function () {

  // define build tasks
  let dev = [
    'styles',
    'scripts',
    'sounds',
    'fonts',
    'icons',
    'images'
  ];

  // run build
  if (config.build) {
    runSequence(dev, function () {
      gulp.start('assets');
    });
  }else{
    runSequence(dev, function () {
      gulp.start('assemble');
      gulp.start('serve');
    });
  }

});
