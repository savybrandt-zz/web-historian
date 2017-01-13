var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function (err, urls) {
    var urlArr = urls.split('\n');
    cb(err, urlArr);
  });
};

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(err, urlArr) {
    if (urlArr.indexOf(url) !== -1) {
      var exist = true;
    } else {
      exist = false;
    }
    cb(err, exist);
  });
};

exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths.list, url + '\n', function(err) {
    cb(err);
  });
};

exports.isUrlArchived = function(url, cb) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    if (files.indexOf(url) !== -1) {
      var exist = true;
    } else {
      exist = false;
    }
    cb(err, exist);
  });
};

exports.downloadUrls = function(urls) {
  // if (!Array.isArray(urls)) {
  //   urls = [urls];
  // } 

  urls.forEach(function(url) {
    if (!url) { return; } 
    // console.log('Hans test:', exports.paths.archivedSites + '/' + url);
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
    // console.log('did it work?');
  });

};
