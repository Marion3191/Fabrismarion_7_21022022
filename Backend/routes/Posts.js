const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postRoutes = require('../controllers/Posts');



router.get('/', postRoutes.getAllPost);
router.post('/',multer, postRoutes.createPost);
router.post('/delete/:postID', postRoutes.deletePost);
router.post('/update/:postID&:message', postRoutes.updatePost);

router.get('/com', postRoutes.getAllCom);
router.post('/com:postID', postRoutes.addCom);
router.post('/com/delete/:comID', postRoutes.deleteCom);
router.post('/com/update/:comID&:message', postRoutes.updateCom);


module.exports = router;