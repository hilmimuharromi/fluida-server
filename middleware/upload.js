const multer = require("multer");
//untuk menambahkan path
const path = require("path");
const Crypto = require('crypto')
function randomString(size = 10) {  
    return Crypto
      .randomBytes(size)
      .toString('hex')
      .slice(0, size)
      
  }
// menentukan lokasi pengunggahan
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../upload"));
  },
  filename: function (req, file, cb) {
      console.log('file ===>', file)
    cb(
      null,
      'img' + "-" + randomString() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: diskStorage }).single("pdf")

module.exports = upload