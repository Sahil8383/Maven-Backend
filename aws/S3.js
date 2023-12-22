const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

AWS.config.logger = console;

AWS.config.update({
    accessKeyId: 'AKIAVW7QQ34A5P6P2TVS',
    secretAccessKey: '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',
    region: 'ap-south-1',
});

const s3 = new AWS.S3();


function UploadS3 (file){
    
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: 'maven-videos-bucket',
        Body: fileStream,
        Key: file.originalname
    }

    return s3.upload(uploadParams).promise();
}

exports.UploadS3 = UploadS3;