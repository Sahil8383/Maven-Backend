const { S3 } = require("aws-sdk");

exports.s3Uploadv3 = async (file) => {
  const s3 = new S3();
  if (!file) {
    throw new Error("File is missing");
  }

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return await s3.upload(param).promise();
};
