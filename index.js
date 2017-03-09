var glob = require('glob')

module.exports = function (config) {
  var tasks = glob.sync('tasks/**/*.js')
  tasks.each(function (task) {
    task(config)
  })
}
