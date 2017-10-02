var glob = require('glob')
var path = require('path')
var webpack = require('webpack')

module.exports = function (gulp, config) {
  gulp.task('jquery', function () {
    return gulp
      .src('node_modules/jquery/dist/jquery.min.*')
      .pipe(gulp.dest(path.join(config.assetsPath, 'dist/javascripts')))
  })

  gulp.task('js-vendor', function () {
    return gulp
      .src(path.join(config.assetsPath, 'src/javascripts/vendor/*'))
      .pipe(gulp.dest(path.join(config.assetsPath, 'dist/javascripts/vendor')))
  })

  gulp.task('js', function () {
    var promises = []

    // Loop over all our entrypoints
    var entrypoints = glob.sync(path.join(config.assetsPath, 'src/javascripts/*.js'))

    if (!entrypoints) {
      return
    }

    entrypoints.forEach(function (entrypoint) {
      var name = path.basename(entrypoint)

      promises.push(new Promise(function (resolve, reject) {
        webpack({
          entry: path.resolve(entrypoint),
          output: {
            filename: path.resolve(path.join(config.assetsPath, 'dist/javascripts', name))
          },
          module: {
            loaders: [
              {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  presets: ['env', {
                    debug: true
                  }],
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
          resolve()
        })
      }))
    })

    return Promise.all(promises)
  })
}
