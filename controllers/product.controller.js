const productModel = require("../models/home.model");
exports.getProduct = (req, res) => {
  id = req.params.id;
  productModel
    .getProduct(id)
    .then((product) => {
      res.render("product", {
        product: product,
        title: "productDetails",
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteProduct = (req,res,next)=>{
  productModel.deleteProduct(req.body.productId).then(res.redirect('/')).catch(err=>console.log(err))
}