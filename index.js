var glob = require('glob')
var path = require('path')

module.exports = function (gulp, config) {
  var tasks = glob.sync(path.join(__dirname, '/tasks/**/*.js'))

  tasks.forEach(function (task) {
    var taskModule = require(task)
    taskModule(gulp, config)
  })
}
