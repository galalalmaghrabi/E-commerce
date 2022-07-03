const mongoose = require("mongoose");
const DB =
  "mongodb+srv://galal:galal@cluster0.tamoq.mongodb.net/E-commerce?retryWrites=true&w=majority";
const productSchema = mongoose.Schema({
  name: String,
  price: String,
  category: String,
  desc: String,
  image: String,
  imageTwo: String,
  imageThree: String,
  imageFour: String,
});
const Product = mongoose.model("product", productSchema);

exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        return Product.find({});
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        
      });
  });
};
exports.getAllProductsByCategory = category => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        return Product.find({category:category});
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        
      });
  });
};
exports.getProduct = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        return Product.findById(id);
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject("error to find product");
      });
  });
};
exports.addProduct = (
  name,
  image,
  imageTwo,
  imageThree,
  imageFour,
  price,
  category,
  desc
) => {
  return new Promise((resolve, reject) => {
     mongoose
      .connect(DB)
      .then(() => {
        let newProduct = new Product({
          name: name,
          image: image,
          imageTwo: imageTwo,
          imageThree: imageThree,
          imageFour: imageFour,
          price: price,
          category: category,
          desc: desc,
        });
        return  newProduct.save();
      })
      .then(() => {
        console.log(true);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

exports.deleteProduct = id => {
  return new Promise((resolve,reject)=>{
    mongoose.connect(DB).then(()=>{
      return Product.findOneAndDelete({_id:id})
    }).then(()=>{
      resolve()
    }).catch((err)=>{
      console.log(false)
    })
  })
}