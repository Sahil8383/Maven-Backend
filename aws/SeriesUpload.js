const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();
AWS.config.logger = console;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

exports.s3Uploadv2 = async (files) => {
  if (!files) {
    throw new Error("File is missing");
  }

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};
