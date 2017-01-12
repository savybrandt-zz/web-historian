var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

var defaults = httpHelpers.headers;

exports.handleRequest = function (req, res) {

  var statusCode;

  if (req.method === 'GET' && req.url === '/') {
    statusCode = 200;
    fs.readFile('/Users/student/Desktop/hrsf53-web-historian/web/public/index.html', function (err, data) {
      if (err) {
        console.log('error!');
        throw err;
      } else {
        data = data.toString();
        res.writeHead(statusCode, defaults);
        res.end(data);
      }
    });
  } else if (req.method === 'GET') {
  }

  if (req.method === 'POST') {
    statusCode = 302;
    req.on('data', function (data) {
      data = data.toString().slice(4) + '\n';
      fs.appendFile(archive.paths.list, data, function(err) {
        if (err) {
          throw err;
        }
        res.writeHead(statusCode, defaults);
        console.log('archive.paths.list: ', archive.paths.list);
        res.end(archive.paths.list);
      });
    });
  }
  //res.end(archive.paths.list);
};

