const router = require("express").Router()
const bodyparser = require('body-parser')
const authController = require('../controllers/auth.controller')
const authGaurd = require('./guards/auth.guard')
const check = require('express-validator').check
router.get('/signup',authGaurd.notUser, authController.getPage)
router.post('/signup',authGaurd.notUser,bodyparser.urlencoded({extended:true}),
check("firstname").notEmpty().withMessage("Please Enter Your First Name"),
check("lastname").notEmpty().withMessage("Please Enter Your Last Name"),
check("username").notEmpty().withMessage("Please Enter Your Username").isEmail().withMessage("Please It Must Be Email"),
check("password").notEmpty().withMessage("Please Enter Your Password").isLength({min:6}).withMessage("Please Your Password Must Be Greater than 6 "),
check('comfirmpassword').custom((value,{req})=>{
    if(value === req.body.password) return true
    else throw 'Passworn Not Match'
}),
authController.postSignup)
router.get('/login',authGaurd.notUser,authController.getPageLogin)
router.post('/login',authGaurd.notUser,bodyparser.urlencoded({extended:true}),authController.postLogin)

router.all('/logout',authGaurd.isUser,authController.logout)
module.exports = router