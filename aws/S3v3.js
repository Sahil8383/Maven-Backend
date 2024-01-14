const { S3 } = require("aws-sdk");
const AWS = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
dotenv.config();
AWS.config.logger = console;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.s3v3 = async (files) => {
  const s3client = new S3Client();

  const uploadPromises = files.map(async (file) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const response = await s3client.send(new PutObjectCommand(params));
      return {
        key: params.Key, // Include the object key in the response
        ETag: response.ETag,
        ServerSideEncryption: response.ServerSideEncryption,
      };
    } catch (error) {
      console.error("Error uploading object:", error);
      throw error;
    }
  });

  return Promise.all(uploadPromises);
};
