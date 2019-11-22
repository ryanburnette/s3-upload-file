'use strict';

var fs = require('fs');
var path = require('path');

function upload(opts) {
  if (!opts) {
    throw new Error('opts must be set');
  }
  if (!opts.s3) {
    throw new Error('opts.s3 must be set');
  }
  if (!opts.filePath) {
    throw new Error('opts.filePath must be set');
  }

  if (!opts.uploadOpts) {
    opts.uploadOpts = {};
  }
  if (!opts.uploadOpts.Bucket) {
    throw new Error('opts.uploadOpts.Bucket must be set');
  }
  if (opts.uploadOpts.Key) {
    throw new Error('opts.uploadOpts.Key may not be set');
  }
  if (opts.uploadOpts.Body) {
    throw new Error('opts.uploadOpts.Body may not be set');
  }

  var fileName = path.basename(opts.filePath);

  if (opts.remotePathPrefix) {
    opts.uploadOpts.Key = path.join(opts.remotePathPrefix, fileName);
  } else {
    opts.uploadOpts.Key = fileName;
  }

  var fileStream = fs.createReadStream(opts.filePath);
  opts.uploadOpts.Body = fileStream;

  return new Promise(function(resolve, reject) {
    fileStream.once('error', reject);
    opts.s3.upload(opts.uploadOpts, function(err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = upload;
