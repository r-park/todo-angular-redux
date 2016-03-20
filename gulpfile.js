/* eslint-disable no-multi-spaces, no-process-exit, strict */
'use strict';

const del           = require('del');
const eslint        = require('gulp-eslint');
const fs            = require('fs');
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
    js: 'src/**/*.js'
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

  db: {
    file: path.join(__dirname, 'db.json')
  },

  header: {
    src: paths.target + '/{main.js,styles.css}',
    template: '/* <%= name %> v<%= version %> - <%= date %> - <%= url %> */\n'
  },

  karma: {
    configFile: path.resolve('./karma.config.js')
  },

  webpack: {
    dev: './webpack.dev',
    dist: './webpack.dist'
  }
};


//=========================================================
//  TASKS
//---------------------------------------------------------
gulp.task('clean.target', () => del(paths.target));


gulp.task('create.db', done => {
  const content = {
    tasks: [
      {
        completed: false,
        title: 'Todo: Angular Redux',
        id: 0
      }
    ]
  };

  fs.exists(config.db.file, exists => {
    if (!exists) {
      fs.writeFileSync(config.db.file, JSON.stringify(content), {encoding: 'utf-8'});
    }
    done();
  });
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


gulp.task('lint.tools', () => {
  return gulp.src('*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('serve.dev', done => {
  let conf = require(config.webpack.dev);
  let compiler = webpack(conf);
  let server = new WebpackServer(compiler, conf.devServer);

  server.listen(conf.devServer.port, 'localhost', () => {
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    gutil.log('WebpackDevServer:', gutil.colors.magenta(`http://localhost:${conf.devServer.port}`));
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    done();
  });
});


gulp.task('serve.api', done => {
  let server = jsonServer.create();
  server.use(jsonServer.defaults());
  server.use(jsonServer.router('db.json'));

  server.listen(3001, 'localhost', () => {
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    gutil.log('JSON API Server:', gutil.colors.magenta('http://localhost:3001'));
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    done();
  });
});


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
  'clean.target',
  'js',
  'headers'
));
