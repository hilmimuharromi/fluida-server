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

const handleMulter = (field, key) => {
  const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../upload"));
    },
    filename: function (req, file, cb) {
        console.log('file ===>', file)
      cb(
        null,
        key + "-" + randomString() + path.extname(file.originalname)
      );
    },
  });
  console.log('running', 27)
  return multer({ storage: diskStorage }).single(field)

}

module.exports = handleMulter