const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const profilRoutes = require('../controllers/Profil');

router.post('/modify', profilRoutes.modifyProfil);
router.get('/Delete/:usrID', profilRoutes.delete);
router.post('/upload/:usrID', multer,profilRoutes.uploadPics);
router.post('/getimg/:usrID', multer,profilRoutes.getPicsUrl);

module.exports = router;