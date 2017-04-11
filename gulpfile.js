var gulp = require('gulp');
var del = require('del');
var vinylPaths = require('vinyl-paths');

var vendorCss = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
  'node_modules/ekko-lightbox/dist/ekko-lightbox.min.css',
  'node_modules/ekko-lightbox/dist/ekko-lightbox.min.css.map'
];

var vendorFonts = [
  'node_modules/bootstrap/dist/fonts/*',
];

gulp.task('clean:vendorCSS', [], function() {
  console.log("Cleaning vendor CSS");
  return gulp.src('assets/vendor/css').pipe(vinylPaths(del));
});

gulp.task('clean:vendorFonts', [], function() {
  console.log("Cleaning vendor fonts");
  return gulp.src('assets/vendor/fonts').pipe(vinylPaths(del));
});

gulp.task('build:vendorCSS', [], function() {
  console.log("Moving vendor CSS to the assets directory");
  vendorCss.forEach(function(sourceCss) {
    return gulp.src(sourceCss).pipe(gulp.dest('assets/vendor/css'));
  })
});

gulp.task('build:vendorFonts', [], function() {
  console.log("Moving vendor CSS to the assets directory");
  vendorFonts.forEach(function(sourceFont) {
    return gulp.src(sourceFont).pipe(gulp.dest('assets/vendor/fonts'));
  })
});

gulp.task('clean', [
  'clean:vendorCSS',
  'clean:vendorFonts'
]);

gulp.task('build', [
  'build:vendorCSS',
  'build:vendorFonts'
]);