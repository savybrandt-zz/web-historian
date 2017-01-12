var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!
var url; 
var defaults = httpHelpers.headers;

exports.handleRequest = function (req, res) {
  
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(archive.paths.siteAssets + '/index.html', function (err, data) {
      if (err) {
        console.log('error #1');
        throw err;
      } 
      res.writeHead(200, defaults);
      res.end(data);
    });
  } else if (req.method === 'GET') {
    fs.readFile(archive.paths.archivedSites + req.url, function (err, data) {
      if (err) {
        console.log('error #2');
        throw err;
      } 
      res.writeHead(200, defaults);
      res.end(data);
    });
  } else if (req.method === 'POST') {
    req.on('data', function (data) {
      url = data.toString().slice(4);
      fs.appendFile(archive.paths.list, url + '\n', function(err) {
        if (err) {
          throw err;
        }
        res.writeHead(302, defaults);
        console.log('archive.paths.list: ', archive.paths.list);
        res.end(archive.paths.list);
      });
    });
  } else {
    res.writeHead(404);
    res.end();
  }
  //res.end(archive.paths.list);
};

