var glob = require('glob')
var path = require('path')
var rollup = require('rollup')
var uglify = require('rollup-plugin-uglify')
var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')

module.exports = function(gulp, config) {
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
          onwarn: function (warning) {
            if ( warning.code === 'UNRESOLVED_IMPORT' ) return;

            // Replace with next(warning) when warn handlers are chainable
            // See https://github.com/rollup/rollup/issues/1245
            console.log(warning.message)
          },
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
