const { Router } = require('express');
const ToData = require('../../../middlewares/ToData');
const controller = require('./userController');
const validation = require('./userValidation');

const router = Router({ mergeParams: true });

router.post('/user/login', controller.login);

module.exports = router;