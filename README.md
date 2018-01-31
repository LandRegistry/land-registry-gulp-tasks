# land-registry-gulp-tasks

These Gulp tasks are designed primarily to be used by those consuming GOV.UK and [land-registry-elements](https://github.com/LandRegistry/land-registry-elements) assets. However the bits of code specific to these are relatively innocuous and so these Gulp tasks could be used by non GOV.UK apps as well.

## Example Gulp file

```
var gulp = require('gulp')
var landRegistryGulpTasks = require('land-registry-gulp-tasks')
var path = require('path')

var config = {
  'applicationPath': './app',     // Path on disk to the main application folder
  'sourcePath': './app/assets/src',         // Path where the assets are located
  'destinationPath': './app/assets/dist',         // Path where the built assets should be written
  'sassPath': 'scss/*.scss',  // Path to the sass within the sourcePath
  'sassIncludePaths': [           // Additional search paths for node-sass
    path.join(path.dirname(require.resolve('land-registry-elements/README.md')), 'src')
  ],
  'browsersyncPort': 3000,        // Port to run the browsersync proxy on (Defaults to 3000)
  'localhost': 'localhost:8080'   // URL pointing to the running application. This is used by browserSync to create a live-reload proxy,
  'lintingPaths': [
    // Array of path glob patterns to add to the linting
    // Most useful for *ignoring* certain paths by prefixing with an !
    // For example !bin/**
  ]
}

// Register all the gulp tasks provided by the land registry module
// If you don't want to do this, you could opt not to register some of the tasks
// Also, if you want more tasks than this, you are free to use the gulp variable
// and register custom tasks below
for (var task in landRegistryGulpTasks) {
  landRegistryGulpTasks[task](gulp, config)
}

// Grab reference to watch task registered from land-registry-gulp -tasks
var existingWatch = gulp.tasks.watch.fn

// Override the watch task with our own custom one
gulp.task('watch', function () {
  gulp.watch(path.join('src/**/*.scss'), ['sass', 'sass-lint'])
  gulp.watch(path.join('src/**/*.js'), ['js', 'standardjs'])

  // Call the previous one from land-registry-gulp-tasks
  existingWatch()
})

```
