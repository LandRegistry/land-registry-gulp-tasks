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
    var patternLibraryPath
    if (fs.existsSync('node_modules/land-registry-elements')) {
      patternLibraryPath = 'node_modules/land-registry-elements'
    } else {
      patternLibraryPath = '.'
    }

    return gulp
      .src(path.join(patternLibraryPath, 'src/land_registry_elements/**/*.{gif,png,jpg,jpeg,svg}'))
      .pipe(gulp.dest(path.join(config.destinationPath, 'images/land_registry_elements')))
  })
}
