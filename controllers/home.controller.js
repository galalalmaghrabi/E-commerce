const homeModel = require("../models/home.model");
const resultError = require('express-validator').validationResult
exports.homePage = (req, res) => {
  let category = req.query.category;
  
  if (category && category !== "all") {
    homeModel.getAllProductsByCategory(category).then((products) => {
      res.render("index", {
        title: "home",
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        products: products,
      });
    })
  } else {
    homeModel
      .getAllProducts(category)
      .then((products) => {
       
        res.render("index", {
          title: "home",
          isUser: req.session.userId,
          isAdmin: req.session.isAdmin,
          products: products,
         
        });
        
      })
      .catch((err) => {
        res.redirect("/admin/add");
        console.log(err);
      });
  }
};
