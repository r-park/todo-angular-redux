var del           = require('del'),
    eslint        = require('gulp-eslint'),
    gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    header        = require('gulp-header'),
    inject        = require('gulp-inject'),
    jsonServer    = require('json-server'),
    karma         = require('karma'),
    path          = require('path'),
    webpack       = require('webpack'),
    WebpackServer = require("webpack-dev-server");


//=========================================================
//  PATHS
//---------------------------------------------------------
var paths = {
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
var config = {
  eslint: {
    src: paths.src.js
  },

  header: {
    src: paths.target + '/{main.js,styles.css}',
    template: '/* <%= name %> v<%= version %> - <%= date %> - <%= url %> */\n'
  },

  inject: {
    src: 'target/index.html',
    includes: [
      'target/styles.css',
      'target/vendor.js'
    ],
    options: {relative: true}
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
gulp.task('clean.target', function(){
  return del(paths.target);
});


gulp.task('copy.html', function(){
  return gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.target));
});


gulp.task('headers', function(){
  var pkg = require('./package.json');
  var headerContent = {date: (new Date()).toISOString(), name: pkg.name, version: pkg.version, url: pkg.homepage};

  return gulp.src(config.header.src)
    .pipe(header(config.header.template, headerContent))
    .pipe(gulp.dest(paths.target));
});


gulp.task('inject', function(){
  return gulp.src(config.inject.src)
    .pipe(inject(
      gulp.src(config.inject.includes, {read: false}),
      config.inject.options
    ))
    .pipe(gulp.dest(paths.target));
});


gulp.task('js', function(done){
  var conf = require(config.webpack.prod);
  webpack(conf).run(function(error, stats){
    if (error) throw new gutil.PluginError('webpack', error);
    gutil.log(stats.toString(conf.stats));
    done();
  });
});


gulp.task('lint', function(){
  return gulp.src(config.eslint.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('serve', function(done){
  var conf = require(config.webpack.dev);
  var compiler = webpack(conf);

  var server = new WebpackServer(compiler, {
    contentBase: paths.src.root,
    publicPath: conf.output.publicPath,
    stats: conf.stats
  });

  server.listen(7000, 'localhost', function(){
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    gutil.log(gutil.colors.magenta('WebpackDevServer listening @ localhost:7000'));
    gutil.log(gutil.colors.gray('-------------------------------------------'));
    done();
  });
});


gulp.task('serve.api', function(done){
  var server = jsonServer.create();
  server.use(jsonServer.defaults());
  server.use(jsonServer.router('db.json'));

  server.listen(3000, 'localhost', function(){
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
gulp.task('default', gulp.parallel('serve', 'serve.api'));


//===========================
//  TEST
//---------------------------
function karmaServer(options, done) {
  var server = new karma.Server(options, function(error){
    if (error) process.exit(error);
    done();
  });
  server.start();
}


gulp.task('test', function(done){
  config.karma.singleRun = true;
  karmaServer(config.karma, done);
});


gulp.task('test.watch', function(done){
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
  'inject',
  'headers'
));
