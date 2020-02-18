const express= require('express');
const router = express.Router();
const uploadFile = require('../utils/file/upload');
const c_file= require('../controllers/c_file');
const token= require('../utils/token');

router.get('/all/:iduser', token.verify, c_file.all)

router.post('/upload', token.verify, uploadFile.any(), c_file.upload);

router.patch('/rename', token.verify, c_file.rename)

router.get('/download/:id', token.verify,  c_file.download)

router.delete('/remove/', token.verify, c_file.remove);

module.exports = router