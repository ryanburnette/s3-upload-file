'use strict';

var fs = require('fs');
var path = require('path');
var mime = require('mime-types');

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

  if (opts.remotePathPrefix) {
    opts.uploadOpts.Key = path.join(opts.remotePathPrefix, opts.filePath);
  } else {
    opts.uploadOpts.Key = opts.filePath;
  }

  if (!opts.uploadOpts.ContentType) {
    opts.uploadOpts.ContentType =
      mime.lookup(opts.filePath) || 'application/octet-stream';
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
