var path = require('path')
var standard = require('gulp-standard')
var sassLint = require('gulp-sass-lint')

module.exports = function (gulp, config) {
  gulp.task('standardjs', function () {
    var jsFiles = [
      '**/*.js',
      '!' + path.join(config.sourcePath, 'javascripts/vendor/**'),
      '!' + path.join(config.destinationPath, '**'),
      '!node_modules/**'
    ]

    return gulp.src(jsFiles)
      .pipe(standard())
      .pipe(standard.reporter('default', {
        breakOnError: true,
        breakOnWarning: true,
        quiet: true,
        showRuleNames: true
      }))
  })

  gulp.task('sass-lint', function () {
    var sassFiles = [
      '**/*.s+(a|c)ss',
      '!' + path.join(config.sourcePath, 'scss/vendor/**'),
      '!' + path.join(config.destinationPath, '**'),
      '!node_modules/**'
    ]

    return gulp.src(sassFiles)
      .pipe(sassLint({
        rules: {
          'property-sort-order': 0,
          'force-element-nesting': 0,
          'force-attribute-nesting': 0,
          'no-color-literals': 0,
          'force-pseudo-nesting': 0,
          'shorthand-values': 0,
          'mixins-before-declarations': 0,
          'no-qualifying-elements': {
            'allow-element-with-attribute': 0
          },
          'class-name-format': 0
        }
      }))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
  })

  gulp.task('test', ['standardjs', 'sass-lint'])
}
