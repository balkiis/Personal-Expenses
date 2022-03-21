const express = require('express')
const router = express.Router()
const currencyController = require('../controllers/currencyController');

router.route('/')
    .get(currencyController.getCurrencies)
    .post(currencyController.addCurrency)

router.route('/:id')
    .delete(currencyController.deleteCurrency)//not for use
    .put(currencyController.editCurrency)

module.exports = router