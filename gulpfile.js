'use strict';

const del           = require('del');
const eslint        = require('gulp-eslint');
const gulp          = require('gulp');
const gutil         = require('gulp-util');
const header        = require('gulp-header');
const jsonServer    = require('json-server');
const karma         = require('karma');
const path          = require('path');
const webpack       = require('webpack');
const WebpackServer = require('webpack-dev-server');


//=========================================================
//  PATHS
//---------------------------------------------------------
const paths = {
  src: {
    root: 'src',
    html: 'src/index.html',
    js: 'src/**/*.js',
    sass: 'src/styles/**/*.scss'
  },

  target: 'target'
};


//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {
  eslint: {
    src: paths.src.js
  },

  header: {
    src: paths.target + '/{main.js,styles.css}',
    template: '/* <%= name %> v<%= version %> - <%= date %> - <%= url %> */\n'
  },

  karma: {
    configFile: path.resolve('./karma.config.js')
  },

  webpack: {
    dev: './webpack.config.dev',
    prod: './webpack.config.prod'
  }
};


//=========================================================
//  TASKS
//---------------------------------------------------------
gulp.task('clean.target', () => del(paths.target));


gulp.task('copy.html', () => {
  return gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.target));
});


gulp.task('headers', () => {
  let pkg = require('./package.json');
  let headerContent = {date: (new Date()).toISOString(), name: pkg.name, version: pkg.version, url: pkg.homepage};

  return gulp.src(config.header.src)
    .pipe(header(config.header.template, headerContent))
    .pipe(gulp.dest(paths.target));
});


gulp.task('js', done => {
  let conf = require(config.webpack.dist);
  webpack(conf).run((error, stats) => {
    if (error) throw new gutil.PluginError('webpack', error);
    gutil.log(stats.toString(conf.stats));
    done();
  });
});


gulp.task('lint', () => {
  return gulp.src(config.eslint.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('serve.dev', done => {
  let conf = require(config.webpack.dev);
  let compiler = webpack(conf);

  let server = new WebpackServer(compiler, {
    contentBase: paths.src.root,
    publicPath: conf.output.publicPath,
    stats: conf.stats
  });

  server.listen(7000, 'localhost', () => {
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    gutil.log(gutil.colors.magenta('WebpackDevServer listening @ localhost:7000'));
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    done();
  });
});


gulp.task('serve.api', done => {
  let server = jsonServer.create();
  server.use(jsonServer.defaults());
  server.use(jsonServer.router('db.json'));

  server.listen(3000, 'localhost', () => {
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    gutil.log(gutil.colors.magenta('JSON API Server listening @ localhost:3000'));
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    done();
  });
});


//===========================
//  BUILD
//---------------------------
gulp.task('build', gulp.series(
  'clean.target',
  'copy.html'
));


//===========================
//  DEVELOP
//---------------------------
gulp.task('default', gulp.parallel('serve.dev', 'serve.api'));


//===========================
//  TEST
//---------------------------
function karmaServer(options, done) {
  let server = new karma.Server(options, error => {
    if (error) process.exit(error);
    done();
  });
  server.start();
}


gulp.task('test', done => {
  config.karma.singleRun = true;
  karmaServer(config.karma, done);
});


gulp.task('test.watch', done => {
  karmaServer(config.karma, done);
});


//===========================
//  RELEASE
//---------------------------
gulp.task('dist', gulp.series(
  'lint',
  'test',
  'build',
  'js',
  'headers'
));
