const { Router } = require('express');
const ToData = require('../../middlewares/ToData');
const controller = require('./userController');
const validation = require('./userValidation');

const router = Router({ mergeParams: true });

router.get('/users', controller.getAll);

module.exports = router;