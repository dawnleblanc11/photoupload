require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

//uploads a file to AWS s3
const s3 = new S3 ({
    region,
    accessKeyId,
    secretAccessKey
})


function uploadFile(file) {
 const fileStream= fs.createReadStream(file)
 console.log(fileStream)
 const uploadParams = {
     Bucket: bucketName,
     Body: fileStream,
     Key: "Airplane.jpg"
     // not sure if we want this to be post-id to pull with
 }
    console.log('preparing to send to AWS')
    console.log(uploadParams)
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile



// downloads a file from AWS s3

function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream()
}
 exports.getFileStream = getFileStream