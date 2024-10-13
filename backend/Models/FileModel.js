const fs = require('fs');
const path = require('path');

class FileModel {
  static saveFile(file, callback) {
    const filePath = path.join(__dirname, '../uploads/', file.originalname);

   
    fs.writeFile(filePath, file.buffer, (err) => {
      callback(err);
    });
  }
}

module.exports = FileModel;
