const Product = require("../models/home.model");
const cartModel = require("../models/cart.model");
exports.addNewPage = (req, res, next) => {
  res.render("add-product", {
    title: "Add Product",
    isUser: req.session.isUser,
    isAdmin: req.session.isAdmin,
  });
};
exports.addNew = (req, res, next) => {
  const img1 = req.files.image[0].filename
  const img2 = req.files.imageTwo[0].filename
  const img3 = req.files.imageThree[0].filename
  const img4 = req.files.imageFour[0].filename

  Product.addProduct(
    req.body.name,
    img1,
    img2,
    img3,
    img4,
    req.body.price,
    req.body.category,
    req.body.desc
  )
    .then(()=>{
      res.redirect("/")
      console.log(true);
    })
    .catch((err) => console.log(err));
};
exports.mangeProduct = (req,res,next)=>{
cartModel.getAllOrders().then((items)=>{
  res.render('mangeProduct',{
    title: "Mange Product",
    isUser: req.session.isUser,
    isAdmin: req.session.isAdmin,
    items:items
  })
})
}
exports.saveEditOrder  = (req,res,next)=>{
  const id = (req.body._id)
  const userId = req.body.userId
  const status = req.body.status
  cartModel.saveEditOrder(id,userId,status).then(res.redirect("/admin/mangeProduct")).catch(err=>console.log(err))
}
exports.deleteOrderAdmin  = (req,res,next)=>{
  const id = (req.body._id)
  const userId = req.body.userId
  cartModel.deleteOrderAdmin(id,userId).then(res.redirect("/admin/mangeProduct")).catch(err=>console.log(err))
}