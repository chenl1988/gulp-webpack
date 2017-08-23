var gulp = require('gulp'),
    os = require('os'),
    gutil = require('gulp-util'),
    gulpOpen = require('gulp-open'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    md5 = require('gulp-md5-plus'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

var myDevConfig = Object.create(webpackConfig);
var devCompiler = webpack(myDevConfig);

//mac chrome: "Google chrome", 
var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));

gulp.task('clean', function (done) {
    gulp.src(['dist'])
        .pipe(clean())
        .on('end', done);
});

gulp.task('connect', function () {
    console.log('connect------------');
    connect.server({
        root: 'dist/',
        port: 3000,
        livereload: true
    });
});

gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000/html'
        }))
        .on('end', done);
});

//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
    gulp.src('dist/js/*.js')
        .pipe(md5(10, 'dist/html/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', done);
});

//将图片拷贝到目标目录
gulp.task('copy:images', function (done) {
    gulp.src(['src/images/**'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .on('end', done);
});

//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['src/html/**'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist/html'))
        .on('end', done)
        .pipe(connect.reload());
});


/*引用webpack对js进行操作*/
gulp.task("build-js", ['fileinclude'], function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            chunks: false,
            colors: true
        }));
        callback();
    });
});

gulp.task('watch', function (done) {
    gulp.watch('src/**/*', 
        [ 
         'build-js', 
         /*'md5:js',*/
         'fileinclude',
         'copy:images'
        ])
        .on('end', done);
});
//发布
gulp.task('default', 
    ['connect','copy:images', 'fileinclude', 'md5:js', 'watch','open']);
//开发
gulp.task('dev', 
    ['connect','copy:images', 'fileinclude', 'build-js', 'watch','open']);
