var glob = require('glob')
var path = require('path')
var rollup = require('rollup')
var uglify = require('rollup-plugin-uglify')
var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')

module.exports = function(gulp, config) {
  gulp.task('jquery', function() {
    return gulp
      .src('node_modules/jquery/dist/jquery.min.*')
      .pipe(gulp.dest(path.join(config.assetsPath, 'dist/javascripts')))
  })

  gulp.task('js-vendor', function() {
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

        rollup.rollup({
          moduleContext: config.moduleContext,
          legacy: true,
          entry: entrypoint,
          plugins: [
            nodeResolve(),
            commonjs(),
            uglify({
              compress: {
                screw_ie8: false
              },
              mangle: {
                screw_ie8: false
              },
              output: {
                screw_ie8: false
              }
            })
          ],
        })
          .then(function (bundle) {
            bundle.write({
              format: 'iife',
              moduleName: name,
              dest: path.join(config.assetsPath, 'dist/javascripts', name),
              sourceMap: true
            });
          })
          .then(resolve)
          .catch(reject)

      }))
    })

    return Promise.all(promises)
  })
}
