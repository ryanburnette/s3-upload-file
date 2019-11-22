# [s3-upload-file](https://github.com/ryanburnette/s3-upload-file)

[![repo](https://img.shields.io/badge/repository-Github-black.svg?style=flat-square)](https://github.com/ryanburnette/s3-upload-file)
[![npm](https://img.shields.io/badge/package-NPM-green.svg?style=flat-square)](https://www.npmjs.com/package/@ryanburnette/s3-upload-file)

Upload a file to AWS S3 using Node.js.

## Usage

```js
require('@ryanburnette/s3-upload-file')({
  filePath: 'kitten.jpg',

  // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
  s3: new require('aws-sdk').S3(),

  // uploadOpts will be passed to S3.upload
  // Key and Body will be set for you
  // Bucket must be provided
  // ContentType will be set for you if not provided here
  uploadOpts: {
    Bucket: 'my-bucket'
  },

  // optionally prefix the remote path
  remotePathPrefix: 'foo'
}).then(function(result) {
  console.log(result);
});
```
