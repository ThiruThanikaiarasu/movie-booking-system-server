class S3TransactionError extends Error {
    constructor(message = "Failed to upload image. Please try again later.", statusCode = 503) {
        super(message)
        this.name = "Upload Error",
        this.statusCode = statusCode
    }
}

module.exports = S3TransactionError