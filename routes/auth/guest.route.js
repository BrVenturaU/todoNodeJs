const {Router} = require('express');
const router = Router();
const authController = require('../../controllers/auth.controller');

router.get('/register', authController.create);
router.post('/register', authController.register);

router.get('/login', authController.login);
router.post('/login', authController.authenticate);



module.exports = router;