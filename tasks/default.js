module.exports = function(gulp, config) {
  gulp.task('copy', [
    'clean',
    'copyGov',
    'jquery'
  ])

  gulp.task('build', [
    'sass',
    'js'
  ])

  gulp.task('default', [
    'build'
  ])
}
