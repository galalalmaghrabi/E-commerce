const mongoose = require("mongoose");
const DB =
  "mongodb+srv://galal:galal@cluster0.tamoq.mongodb.net/E-commerce?retryWrites=true&w=majority";
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { name } = require("ejs");
const { reject } = require("bcrypt/promises");
const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  isAdmin:{
    type:Boolean,
    default:false
  }
});
const User = mongoose.model("User", userSchema);
exports.createUser = ({
  firstname,
  lastname,
  username,
  password,
  confirmpassword,
}) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        return User.findOne({ username: username });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("user is already exist");
        } else {
          if (password !== confirmpassword) {
            mongoose.disconnect();
            reject("password not match");
          } else {
            return bcrypt.hash(password, 10);
          }
        }
      })
      .then((hashed) => {
        let user = new User({
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: hashed,
          isAdmin:false
        });
        user.save();
        console.log(true);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
        console.log(err);
      });
  });
};

exports.loginUser = ( username, password ) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        return User.findOne({ username: username });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("user not exist");
        } else {
          bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject("Wrong password");
            } else {
              mongoose.disconnect();
              resolve({
                id:user._id,
                isAdmin:user.isAdmin
              })
            }
          });
        }
      }).catch(err=>{
          console.log(err);
      })
  });
};
