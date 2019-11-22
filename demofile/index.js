'use strict';

require('dotenv').config({});
var AWS = require('aws-sdk');
var upload = require('../');

upload({
  s3: new AWS.S3(),
  filePath: 'file.txt',
  uploadOpts: {
    Bucket: process.env.BUCKET
  }
}).then(function(result) {
  console.log(result);
});
