var path = require('path')
var fs = require('fs')

module.exports = function(gulp, config) {
  gulp.task('images', ['appImages', 'patternLibraryImages'])

  gulp.task('appImages', function () {
    return gulp
      .src(path.join(config.assetsPath, 'src/images/**'))
      .pipe(gulp.dest(path.join(config.assetsPath, 'dist/images/app')))
  })

  gulp.task('patternLibraryImages', function () {
    if(fs.existsSync('node_modules/land-registry-elements')) {
      var patternLibraryPath = 'node_modules/land-registry-elements'
    } else {
      var patternLibraryPath = '.'
    }

    return gulp
      .src(path.join(patternLibraryPath, 'src/land_registry_elements/**/*.{gif,png,jpg,jpeg,svg}'))
      .pipe(gulp.dest(path.join(config.assetsPath, 'dist/images/land_registry_elements')))
  })
}
