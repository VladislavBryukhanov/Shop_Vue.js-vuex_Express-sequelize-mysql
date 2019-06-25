const fs = require('fs');
const path = require('path');

const deletePreviewPhoto = async (previewPhoto) => {
    if (previewPhoto) {
        const dirPath = path.join( __dirname, `/../public/preview_photo/`);
        const files = [
            dirPath + previewPhoto,
            `${dirPath}/thumbnail/${previewPhoto}`
        ];

        files.forEach(file => {
            fs.unlink(file, (err) => err && console.error(err));
        });
    }
};

module.exports.deletePreviewPhoto = deletePreviewPhoto;
