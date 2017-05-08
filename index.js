var glob = require('glob')
var path = require('path')

module.exports = (function (gulp, config) {
  var tasks = glob.sync(path.join(__dirname, '/tasks/**/*.js'))
  var taskFunctions = {}

  tasks.forEach(function (task) {
    taskFunctions[task] = require(task)
  })

  return taskFunctions
})()
