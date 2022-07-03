const router = require("express").Router()
const homeController = require('../controllers/home.controller')
const authGaurds = require('../routes/guards/auth.guard')
const bodyparser = require('body-parser')
router.get('/',bodyparser.urlencoded({extended:true}),homeController.homePage)

module.exports = router