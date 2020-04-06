const gulp = require('gulp');
const sassvg = require('gulp-sassvg');

gulp.task('sassvg', function(){
  return gulp.src('./sass/svg/**/*.svg')
    .pipe(sassvg({
      outputFolder: './sass/svg/', // IMPORTANT: this folder needs to exist
      optimizeSvg: true // true (default) means about 25% reduction of generated file size, but 3x time for generating the _icons.scss file
    }));
});