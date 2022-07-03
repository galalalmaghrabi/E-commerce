const cartModel = require("../models/cart.model");
const validationResualt = require('express-validator').validationResult
exports.addItem = (req, res, next) => {
  if(validationResualt(req).isEmpty()){
    cartModel
    .addCartItem(
      {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        amount: req.body.amount,
        productId: req.body.productId,
        userId: req.session.userId,
        timestamp: Date.now(),
      },
      req.body.productId,
      req.session.userId
    )
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      res.redirect(req.body.redirectTo);
      console.log(err);
    });
  }else{
    req.flash('validationResualt',validationResualt(req).array()[0])
    res.redirect('/')
  }

};
exports.getItems = (req, res, next) => {
  cartModel
    .getCartItem(req.session.userId)
    .then((items) => {
      res.render("cart", {
        title: "Shopping cart",
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        items: items,
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteItem = (req, res, next) => {
  cartModel
    .deleteItem(req.body.itemId)
    .then(res.redirect("/cart"))
    .catch((err) => console.log(err));
};
exports.deleteAll = (req, res, next) => {
  cartModel
    .deleteAll(req.session.userId)
    .then((items) => {
      console.log(true);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.checkout = (req, res, next) => {
  res.render("checkout", {
    title: "CheckOut",
    isUser: req.session.userId,
    isAdmin: req.session.isAdmin,
  });
};

exports.order = (req, res, next) => {
  cartModel
    .newOrder(req.session.userId,req.body.address,req.body.phone)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      res.redirect(req.body.redirectTo);
      console.log(err);
    });
};
exports.getOrders = (req, res, next) => {
  cartModel.getOrders(req.session.userId).then((items) => {
    res.render("orders", {
      items: items,
      title: "Orders",
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin
    });
  });
};
exports.deleteOrder = (req, res, next) => {
  cartModel
    .deleteOrders(req.body.productId)
    .then(res.redirect("/orders"))
    .catch((err) => console.log(err));
};

