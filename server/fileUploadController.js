const aws = require('aws-sdk')
    , multer = require('multer')
    , multerS3 = require('multer-s3')
    , { key, access, bucketName } = require('./secret');

aws.config.update({
    secretAccessKey: access,
    accessKeyId: key,
    region: 'us-west-1' //E.g us-east-1
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: bucketName,
        key: function (req, file, cb) {
            let name = "name didnt save"
            if (req.params.id) {
                name = req.params.id;
            } else {
                name = req.params.title + ".pdf";
            }
            req.file = name
            cb(null, name);
        }
    })
});

module.exports = upload;