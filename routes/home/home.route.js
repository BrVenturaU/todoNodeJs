const {Router} = require('express');
const router = Router();
const homeController = require('../../controllers/home.controller');
const middleware = require('../../middlewares/authorize.middleware');

router.get('/home', middleware.validateSessionToken, homeController.home);

module.exports = router;