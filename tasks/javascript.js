var glob = require('glob')
var path = require('path')
var browserify = require('browserify');
var browserifyIncremental = require('browserify-incremental');
var fs = require('fs')
var eventStream = require('event-stream')
var extend = require('extend')
var source = require('vinyl-source-stream')
var rename = require('gulp-rename')

module.exports = function(gulp, config) {
  gulp.task('js', function () {

    // Loop over all our entrypoints
    var entrypoints = glob.sync(path.join(config.assetsPath, 'src/javascripts/*.js'))

    if (!entrypoints) {
      return
    }

    var tasks = entrypoints.map(function(entrypoint) {

      var b;
      var browserfyConfig = {
        transform: [
          require('hoganify')
        ]
      };

      // If we're in production mode, turn off debug and enable uglification
      // and use the vanilla browserify module
      if(config.mode === 'production') {
        b = function(additionalConfig) {
          return browserify(extend(browserfyConfig, additionalConfig));
        }
      } else {
        // Otherwise use debug mode
        browserfyConfig.debug = true;

        // And do incremental builds for speed
        b = function(additionalConfig) {
          return browserifyIncremental(extend(browserfyConfig, additionalConfig), {
            cacheFile: '.tmp/browserify-incremental-' + path.basename(entrypoint) + '.json'
          });
        }
      }

      return b({entries: [entrypoint]})
        .bundle()
        .pipe(source(entrypoint))
        .pipe(rename({
          dirname: ''
        }))
        .pipe(gulp.dest(path.join(config.assetsPath, 'dist/javascripts')))
    })

    return eventStream.merge.apply(null, tasks);
  })
}
