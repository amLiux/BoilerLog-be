const S3 = require ('aws-sdk/clients/s3');
require('dotenv').config();
const fs = require('fs');

const s3service = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const uploadFile = (filePath, fileName, id, mimeType) => {
    const fileStream = fs.readFileSync(filePath);
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET,
        Body: fileStream,
        Key: `${id}/${fileName}`,
        ContentType: mimeType
    };
    return s3service.upload(uploadParams).promise();
};

const getFile = (id, fileName) => 
    s3service.getObject({
        Bucket: process.env.AWS_BUCKET,
        Key: `${id}/${fileName}`
    }).createReadStream();

const deleteFile = (id, fileName) => 
    s3service.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: `${id}/${fileName}`
    }).promise();

module.exports = {
    uploadFile,
    getFile,
    deleteFile
};