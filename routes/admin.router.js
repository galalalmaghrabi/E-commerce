const router = require('express').Router()
const adminController = require('../controllers/admin.controller')
const adminGuard = require('./guards/admin.guard')
const multer = require('multer')
const bodyParser = require('body-parser')
router.get('/admin/add',adminGuard,adminController.addNewPage)
router.post('/admin/add',adminGuard,multer({
    storage:multer.diskStorage({
        destination:(req,files,cb)=>{
            cb(null,'images')
        },
        filename:(req,files,cb)=>{
            cb(null,Date.now() + '-' + files.originalname)
        }
    })
}).fields(
    [
        { name: 'image', maxCount: 1 },
        { name: 'imageTwo', maxCount: 1 },
        { name: 'imageThree', maxCount: 1 },
        { name: 'imageFour', maxCount: 1 },
    ]
),bodyParser.urlencoded({extended:true}),adminController.addNew)

router.get('/admin/mangeProduct',adminGuard,adminController.mangeProduct)
router.post('/order/Save',adminGuard,bodyParser.urlencoded({extended:true}),adminController.saveEditOrder)
router.post('/order/delete',adminGuard,bodyParser.urlencoded({extended:true}),adminController.deleteOrderAdmin)

module.exports = router