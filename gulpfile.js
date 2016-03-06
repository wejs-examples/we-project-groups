var We = require('we-core');
var projectFolder = process.cwd();
var gulp = require('gulp');
var weGulpTasks = require('we-gulp-tasks-default');
var we = new We();

weGulpTasks(we, gulp, projectFolder, function doneTask() {
  we.exit(function(){
    process.exit();
  });
});