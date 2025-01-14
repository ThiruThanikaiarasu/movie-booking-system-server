const crypto = require('crypto')
const { PutObjectCommand } = require('@aws-sdk/client-s3')

const s3 = require("../configurations/s3Config")
const S3TransactionError = require('../errors/S3TransactionError')


const generateRandomImageName = () => crypto.randomBytes(32).toString('hex')

const uploadToS3 = async (thumbnail) => {
    const imageName = generateRandomImageName()

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
        Body: thumbnail.buffer,
        ContentType: thumbnail.mimetype,
        ACL: 'bucket-owner-full-control'
    }

    try{
        await s3.send(new PutObjectCommand(params))
        return imageName
    } 
    catch(error) {
        throw new S3TransactionError("Failed to upload image. Please try again later.", 503)
    }
}

module.exports = {
    uploadToS3
}