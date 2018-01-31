var path = require('path')
var fs = require('fs')

module.exports = function (gulp, config) {
  gulp.task('images', ['appImages', 'patternLibraryImages'])

  gulp.task('appImages', function () {
    return gulp
      .src(path.join(config.sourcePath, 'images/**'))
      .pipe(gulp.dest(path.join(config.destinationPath, 'images/app')))
  })

  gulp.task('patternLibraryImages', function () {
    var patternLibraryPath = path.dirname(require.resolve('land-registry-elements/README.md'))
    if (!fs.existsSync(patternLibraryPath)) {
      patternLibraryPath = '.'
    }

    return gulp
      .src(path.join(patternLibraryPath, 'src/land_registry_elements/**/*.{gif,png,jpg,jpeg,svg}'))
      .pipe(gulp.dest(path.join(config.destinationPath, 'images/land_registry_elements')))
  })
}
