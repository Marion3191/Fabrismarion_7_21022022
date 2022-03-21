const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postRoutes = require('../controllers/Posts');
const like = require('../controllers/like');


router.get('/', postRoutes.getAllPost);
router.post('/', postRoutes.createPost);
router.post('/delete/:postID', postRoutes.deletePost);
router.post('/update/:postID&:message', postRoutes.updatePost);

router.get('/com', postRoutes.getAllCom);
router.post('/com:postID', postRoutes.addCom);
router.post('/com/delete/:comID', postRoutes.deleteCom);
router.post('/com/update/:comID&:message', postRoutes.updateCom);

/* v-bind:value
router.get('/:id', auth, saucesRoutes.getOneSauces);
router.put('/:id', auth, multer, saucesRoutes.modifySauces);
router.delete('/:id', auth, saucesRoutes.deleteSauces);
router.post('/:id/like', auth, like.likeSauces);
q<éééé
*/
module.exports = router;