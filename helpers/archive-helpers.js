var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.getWebsiteContent = function(url) {
  //access archived site
  // add '/' and data to the archived site for the correct pathway
  var pathway = exports.paths.archivedSites + '/' + url;
  
  // grab the html by fs.readFile with our newly concated pathway
  fs.readFile(pathway, function(err, data) {
    if (err) {
      throw err;
    }
    // write head of 200 and defaults
    res.writeHead(200, defaults);
    // return the site html
    res.end(data); 
  });
};

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

exports.readListOfUrls = function() {
};

exports.isUrlInList = function() {
};

exports.addUrlToList = function() {
};

exports.isUrlArchived = function() {

};

exports.downloadUrls = function() {
};
