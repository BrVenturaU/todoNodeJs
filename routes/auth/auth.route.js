const {Router} = require('express');
const router = Router();
const authController = require('../../controllers/auth.controller');
const middleware = require('../../middlewares/authorize.middleware');

router.get('/logout', middleware.validateSessionToken, authController.logout);

module.exports = router;