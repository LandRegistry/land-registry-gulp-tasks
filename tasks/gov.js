var path = require('path')

module.exports = function(gulp, config) {
  gulp.task('copyGovTemplate', function () {
    return gulp
      .src('node_modules/govuk_template_jinja/views/layouts/**')
      .pipe(gulp.dest(path.join(config.applicationPath, 'templates/vendor')))
  })

  gulp.task('copyGovTemplateAssets', function () {
    return gulp
      .src('node_modules/govuk_template_jinja/assets/**')
      .pipe(gulp.dest(config.destinationPath))
  })

  gulp.task('copyGovToolkitImages', function () {
    return gulp
      .src('node_modules/govuk_frontend_toolkit/images/**')
      .pipe(gulp.dest(path.join(config.destinationPath, 'images')))
  })

  gulp.task('copyGovElements', function () {
    return gulp
      .src([
        'node_modules/govuk-elements-sass/public/sass/**',
        'node_modules/govuk_frontend_toolkit/stylesheets/**'
      ])
     .pipe(gulp.dest(path.join(config.sourcePath, 'scss/vendor/govuk-elements')))
  })

  gulp.task('copyGov', [
    'copyGovTemplate',
    'copyGovTemplateAssets',
    'copyGovElements',
    'copyGovToolkitImages'
  ])
}
