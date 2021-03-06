const express = require('express');
const router = express.Router();
const controller = require('./controller');

/*
 * /api/tweets/     GET    - READ ALL
 * /api/tweets/     POST   - CREATE
 * /api/tweets/:id  GET    - READ ONE
 * /api/tweets/:id  PUT    - UPDATE
 * /api/tweets/:id/enable  PUT - ENABLE OR DISABLE
 */

router.route('/')
    .get(controller.total, controller.all)
    .post(controller.create);
    
router.param('id', controller.findById);
    
router.route('/:id')
    .get(controller.get)
    .put(controller.update);
//.delete(controller.delete)
    
router.route('/:id/enable')
    .put(controller.enable);

module.exports = router;