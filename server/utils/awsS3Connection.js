// This is based on AWS SDK V2. V3 is now available with better API documentation.
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;

// Set up the S3 connection.
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Upload file to S3
exports.uploadeFileToS3 = (fileName, fileBody) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBody,
    Key: `images/${fileName}`,
  };

  return s3.upload(uploadParams).promise();
};

// Delete file from S3
exports.deleteFileFromS3 = (fileURL) => {
  const key = fileURL.slice(fileURL.indexOf('images'));
  const deleteParams = {
    Bucket: bucketName,
    Key: key,
  };

  return s3.deleteObject(deleteParams).promise();
};

// Download file from S3
// https://www.sammeechward.com/upload-images-to-s3-from-node-back-end
/*
exports.downloadFileFromS3 = (fileName) => {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  return s3.getObject(downloadParams).createReadStream();
};
*/
