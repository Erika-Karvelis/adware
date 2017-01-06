import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', cb => runSequence('clean', 'eslint', 'webpack-dev-server', 'nodemon', cb));
