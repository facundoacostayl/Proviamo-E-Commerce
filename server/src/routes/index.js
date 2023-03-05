const express = require('express');
const fs = require('fs');
const router = express.Router();

const currentPath = `${__dirname}`;

const removeExtension = (file) => {
    return file.split(".").shift();
}

fs.readdirSync(currentPath).filter(currentFile => {
    const cleanFile = removeExtension(currentFile);
    if(!['index'].includes(cleanFile)) {
        router.use(`/${cleanFile}`, require(`./${cleanFile}`));
        console.log(cleanFile);
    }
});

module.exports = {router};
