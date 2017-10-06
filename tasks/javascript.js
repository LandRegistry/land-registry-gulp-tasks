var glob = require('glob')
var path = require('path')
var webpack = require('webpack')

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

      promises.push(new Promise(function (resolve, reject) {
        webpack({
          entry: path.resolve(entrypoint),
          output: {
            filename: path.resolve(path.join(config.destinationPath, 'javascripts', name))
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
          },
          plugins: [
            new webpack.optimize.UglifyJsPlugin({
              screw_ie8: false,
              output: {
                keep_quoted_props: true // Required for IE8 in situations such as where an object property uses a reserved word like catch
              }
            })
          ]
        },
        function (err, stats) {
          if (err) {
            return reject(err)
          }
          resolve()
        })
      }))
    })

    return Promise.all(promises)
  })
}
