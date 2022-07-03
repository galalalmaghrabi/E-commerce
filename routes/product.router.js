const router = require("express").Router()
const productController = require('../controllers/product.controller')
const adminGuard = require('./guards/admin.guard')
const bodyparser = require('body-parser')
router.get('/product/:id',productController.getProduct)

router.post('/product/deleteProduct',adminGuard,bodyparser.urlencoded({extended:true}),productController.deleteProduct)
module.exports = router
