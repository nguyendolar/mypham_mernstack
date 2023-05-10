'use strict'
const paymentController = require('../controllers/paymentOnline.controller');
module.exports = (app) => {
      app.route('/payment-online')
        .post(paymentController.momoPayment);
      app.route('/payment-online/all')
        .get(paymentController.getAll);
}