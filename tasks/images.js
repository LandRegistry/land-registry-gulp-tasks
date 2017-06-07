var path = require('path')

module.exports = function(gulp, config) {
  gulp.task('images', ['appImages', 'patternLibraryImages'])

  gulp.task('appImages', function () {
    return gulp
      .src(path.join(config.assetsPath, 'src/images/**'))
      .pipe(gulp.dest(path.join(config.assetsPath, 'dist/images/app')))
  })

  gulp.task('patternLibraryImages', function () {
    try {
      var patternLibraryPath = require.resolve('land-registry-elements')
    } catch(e) {
      var patternLibraryPath = '.'
    }

    return gulp
      .src(path.join(patternLibraryPath, 'src/land-registry-elements/**/*.{gif,png,jpg,jpeg,svg}'))
      .pipe(gulp.dest(path.join(config.assetsPath, 'dist/images/land-registry-elements')))
  })
}
