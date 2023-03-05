var express = require('express');
var router = express.Router();
var upload = require('multer')();

var uploadFile = require('../controllers/upload-controller.js');

router.post('', upload.single('image'), uploadFile);

module.exports = router;