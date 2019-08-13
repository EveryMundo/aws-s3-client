# aws-s3-client
This is an extraction of the S3 client files from aws-sdk node package

## Objective
The goal here is to have a smaller package (in bytes) that contains only the files necessary to interact with AWS S3 in a way
so a zipped version of the application is smaller than 5MB and we are able to see our code when deployed to lambda function
using custom layers

## Justification
* In order for you to be able to see your code on the AWS Lambda Function console your zip deployed package has to be not larger than 5MB
* If we use a custom layer for a version of the nodejs that is newer than the ones provided by AWS the aws-sdk
package is not provided
* So, when using a custom layer, we need to install the aws-sdk library to interact with S3 with our lambda function
* When we install the aws-sdk package our zip-file gets larger than 5MB, which takes from us the ability to see our code
on the AWS Lambda Function console, and we don't want that

## Instalation
```sh
npm install --save @everymundo/aws-s3-client
```

## Usage
Using Async functions your code can be as simple as this:
```js
// We recommend you using the following approach just so you can easily stub ```lib.S3``` on your tests
const lib = require('@everymundo/aws-s3-client')

const getS3File = async (Bucket, Key) => {
  const s3client = new lib.S3();

  return s3client.getObject({Bucket, Key}).promise();
})
```

If you prefer the callback approach you can do this:
```js
// We recommend you using the following approach just so you can easily stub ```lib.S3``` on your tests
const lib = require('@everymundo/aws-s3-client')

const getS3File = (Bucket, Key) => new Promise((resolve, reject) => {
  const s3client = new lib.S3();

  s3client.getObject({Bucket, Key}, (err, response) => err ? reject(err) : resolve(response));
})
```

if you don't care for stubbing you can go ahead and import the S3 directly as a constant
```js
const {S3} = require('@everymundo/aws-s3-client')

```
