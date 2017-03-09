var glob = require('glob')

module.exports = function (gulp, config) {
  var tasks = glob.sync('tasks/**/*.js')
  tasks.forEach(function (task) {
    task(gulp, config)
  })
}
