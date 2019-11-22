'use strict';

require('dotenv').config({});
var AWS = require('aws-sdk');
var upload = require('../');

upload({
  s3: new AWS.S3(),
  cwd: 'foo/',
  filePath: 'bar/file.txt',
  remotePathPrefix: '1.0.0',
  uploadOpts: {
    Bucket: process.env.BUCKET
  }
}).then(function(result) {
  console.log(result);
});
