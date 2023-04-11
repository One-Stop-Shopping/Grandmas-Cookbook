const S3 = require('aws-sdk/clients/s3');
const fs = require('fs/promises');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_BUCKET_ACCESS_KEY;
const secretKey = process.env.AWS_BUCKET_SECRET_KEY;

const s3 = new S3({
  region,
  accessKey,
  secretKey,
});

// Upload file to S3
