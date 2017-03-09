var gulp = require('gulp')

module.exports = function(config) {
  gulp.task('copy', [
    'clean',
    'copyGov'
  ])

  gulp.task('build', [
    'sass',
    'js'
  ])

  gulp.task('default', [
    'build'
  ])
}
