const { Router } = require('express');
const controller = require('./userController');
const validation = require('./userValidation');
const {validateToken} = require('../../../middlewares/masterAdmin');

const router = Router({ mergeParams: true });

router.post('/user/login', controller.login);
router.post('/user/validate-token', validateToken, controller.validateToken);

module.exports = router;