import gulp from 'gulp';
import eslint from 'gulp-eslint';

import config from '../config';

const eslintTask = () => {
  return gulp.src([config.server.src, config.public.src])
    .pipe(eslint())
    .pipe(eslint.format());
};

gulp.task('eslint', eslintTask);

export default eslintTask;
