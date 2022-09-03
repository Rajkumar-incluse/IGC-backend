const multer = require('multer')

const storage = multer.diskStorage({
    // to store incoming file under uploads folder
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

// accepted mimetype
const MIMETYPES = ["application/pdf"]

function acceptOnly(req, file, cb) {
    console.log({ file });
    if (file.mimetype && MIMETYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        req.fileTypeError = true;
        cb(null, false)
    }
}


const UploadToDisk = multer({ storage: storage, limits: '1mb', fileFilter: acceptOnly, })

module.exports = { UploadToDisk }