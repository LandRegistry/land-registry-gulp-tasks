var glob = require('glob')
var path = require('path')
var webpack = require('webpack')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

module.exports = function (gulp, config) {
  gulp.task('jquery', function () {
    return gulp
      .src('node_modules/jquery/dist/jquery.min.*')
      .pipe(gulp.dest(path.join(config.destinationPath, 'javascripts')))
  })

  gulp.task('js-vendor', function () {
    return gulp
      .src(path.join(config.sourcePath, 'javascripts/vendor/*'))
      .pipe(gulp.dest(path.join(config.destinationPath, 'javascripts/vendor')))
  })

  gulp.task('js', function () {
    var promises = []

    // Loop over all our entrypoints
    var entrypoints = glob.sync(path.join(config.sourcePath, 'javascripts/*.js'))

    if (!entrypoints) {
      return
    }

    entrypoints.forEach(function (entrypoint) {
      var name = path.basename(entrypoint)
      var outputFilename = path.resolve(path.join(config.destinationPath, 'javascripts', name))

      promises.push(new Promise(function (resolve, reject) {
        webpack({
          entry: path.resolve(entrypoint),
          output: {
            filename: outputFilename
          },
          module: {
            loaders: [
              {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  presets: [
                    [
                      'env',
                      {
                        loose: true // For IE8. See https://babeljs.io/docs/usage/caveats/#internet-explorer-getters-setters-8-and-below-
                      }
                    ]
                  ],
                  plugins: [
                    'transform-es3-property-literals',
                    'transform-es3-member-expression-literals'
                  ]
                }
              }
            ]
          }
        },
        function (err, stats) {
          if (err) {
            return reject(err)
          }
          resolve(outputFilename)
        })
      }))
    })

    // Uglify used directly rather than as part of webpack so that we can generate minified files as well as keeping the originals
    var minify = function (outputs) {
      return gulp.src(outputs)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.join(config.destinationPath, 'javascripts')))
    }

    return Promise.all(promises).then(minify)
  })
}
