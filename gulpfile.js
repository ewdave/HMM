const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');

gulp.task('nodemon', () => {
  nodemon({
    script: 'build/server.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('compile', () => {
  gulp.src('./src/**/*.ts')
  .pipe(ts({
    "target": "es5",
    "module": "none",
    "sourceMap": true,
    "noImplicitAny": false
  }))
  .pipe(gulp.dest('build'));

  gulp.src('./src/**/*.json')
  .pipe(gulp.dest('build'));
});

gulp.task('compile::watch', () => {
  gulp.watch('src/**/*.ts', ['compile']);
});

gulp.task('default', ['nodemon', 'compile', 'compile::watch']);
