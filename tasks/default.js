module.exports = function(gulp, config) {
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
