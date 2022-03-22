const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const logger = require('./logger')
const fs = require('fs')
const path = require('path')
const dir = './Files/Events'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, uuidv4() + '-' + fileName)
    }
})
const uploadPhoto = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})
const deletePhoto = (folder, photoFile) => {
    let photo = folder + '/' + photoFile
    let filePath = path.join(__dirname, "..", photo)
    fs.unlink(filePath, function (err, result) {
        if (err) logger.error('Error', err);
    })
}
module.exports = { uploadPhoto, deletePhoto }