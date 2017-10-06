var path = require('path')

var browserSync = require('../utils/browsersync')

module.exports = function (gulp, config) {
  gulp.task('watch', function () {
    gulp.watch(path.join(config.sourcePath, 'scss/**/*.scss'), ['sass', 'sass-lint'])
    gulp.watch(path.join(config.sourcePath, 'javascripts/**/*.js'), ['js', 'standardjs'])
    gulp.watch('gulp/**/*.js', ['standardjs'])

    var unixEpoch = 'Thursday, 01 Jan 1970 00:00:00 GMT'

    browserSync.init({
      port: config.browsersyncPort || 3000,
      proxy: {
        target: config.localhost,
        proxyReq: [
          function (proxyReq) {
            proxyReq.setHeader('Pragma', 'no-cache')
            proxyReq.setHeader('Cache-Control', 'no-cache')
            proxyReq.setHeader('If-Modified-Since', unixEpoch)
          }
        ],
        proxyRes: [
          function (proxyRes, req, res) {
            proxyRes.headers.expires = unixEpoch
            proxyRes.headers['last-modified'] = 'Thursday, 01 Jan 2970 00:00:00 GMT'
            proxyRes.headers['cache-control'] = 'public, max-age=0'
            delete proxyRes.headers.etag
          }
        ]
      },
      open: false
    })

    console.log('Watching...')
  })
}
