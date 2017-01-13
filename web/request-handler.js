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
        res.writeHead(404, defaults);
        res.end();
        return;
      } else {
        res.writeHead(200, defaults);
        res.end(data);        
      }
    });
  } else if (req.method === 'POST') {
    req.on('data', function (data) {
      url = data.toString().slice(4);
      archive.addUrlToList(url, function(err) {
        if (err) {
          res.writeHead(404, defaults);
          res.end();
          return;
        }
        res.writeHead(302, defaults);
        res.end(archive.paths.list);
      });
    });
  } 
};

