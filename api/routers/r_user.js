const express= require('express');
const c_user= require('../controllers/c_user');
const token= require('../utils/token');
const router = express.Router();

router.post('/new', c_user.add);

router.post('/login', c_user.login);

router.delete('/remove', token.verify, c_user.remove);

router.post('/forgot', c_user.sendMail);

router.patch('/updatepass', c_user.updatePassword);


module.exports = router
