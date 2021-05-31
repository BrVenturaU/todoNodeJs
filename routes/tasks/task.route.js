const {Router} = require('express');
const router = Router();
const taskController = require('../../controllers/task.controller');
const middleware = require('../../middlewares/authorize.middleware');

router.get('/index', middleware.validateSessionToken, taskController.get);
router.get('/create', middleware.validateSessionToken, taskController.create);
router.post('/store', middleware.validateSessionToken, taskController.store);
router.get('/:id/edit', middleware.validateSessionToken, taskController.edit);
router.post('/:id/update', middleware.validateSessionToken, taskController.update);
router.post('/:id', middleware.validateSessionToken, taskController.deleteTask);

module.exports = router;