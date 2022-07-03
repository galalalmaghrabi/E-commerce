const flash = require("connect-flash/lib/flash");
const authModel = require("../models/auth.model");
const validationResultError = require('express-validator').validationResult
exports.getPage = (req, res) => {
  res.render("auth/signup", { title: "register", isUser: req.session.userId,isAdmin: req.session.isAdmin ,validationResultError:req.flash('validationResultError')});
};
exports.postSignup = (req, res) => {
  if(validationResultError(req).isEmpty){
    authModel
    .createUser(req.body)
    .then(res.redirect("/login"))
    .catch(res.redirect("/signup"))
  }else{
    req.flash('validationResultError',validationResultError(req).array())
    res.redirect('/signup')
    console.log(validationResultError(req).array)
  }

};

exports.getPageLogin = (req, res) => {
  res.render("auth/login", {
    title: "login",
    authError: req.flash("authError")[0],
    isUser: false,
    isAdmin: req.session.isAdmin
  });
};
exports.postLogin = (req, res) => {
  authModel
    .loginUser(req.body.username, req.body.password)
    .then((resualt) => {
      req.session.userId = resualt.id;
      req.session.isAdmin = resualt.isAdmin;

      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      console.log(false);
      req.flash("authError", err);
      res.redirect("/login");
    });
};
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
