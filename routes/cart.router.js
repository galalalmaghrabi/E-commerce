const router = require("express").Router()
const bodyparser = require('body-parser')
const cartController = require('../controllers/cart.controller')
const authGaurd = require('./guards/auth.guard')
const adminGuard = require('./guards/admin.guard')
const check = require('express-validator').check

router.get('/cart',authGaurd.isUser,bodyparser.urlencoded({extended:true}),cartController.getItems)
router.post('/cart',authGaurd.isUser,bodyparser.urlencoded({extended:true}),check('amount').notEmpty().withMessage('please select amount of product').isLength({min:1}).withMessage('amount must be greater than 0'),cartController.addItem)
router.post('/cart/delete',bodyparser.urlencoded({extended:true}),cartController.deleteItem)
router.post('/cart/deleteAll',authGaurd.isUser,bodyparser.urlencoded({extended:true}),cartController.deleteAll)
router.post('/cart/checkout',authGaurd.isUser,bodyparser.urlencoded({extended:true}),cartController.checkout)
router.post('/cart/checkout/order',authGaurd.isUser,bodyparser.urlencoded({extended:true}),cartController.order)
router.get('/orders',authGaurd.isUser,bodyparser.urlencoded({extended:true}),cartController.getOrders)
router.post('/cart/order/delete',authGaurd.isUser,bodyparser.urlencoded({extended:true}),cartController.deleteOrder)

module.exports = router