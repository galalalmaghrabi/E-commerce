const mongoose = require("mongoose");
const DB =
  "mongodb+srv://galal:galal@cluster0.tamoq.mongodb.net/E-commerce?retryWrites=true&w=majority";
const cartSchema = mongoose.Schema({
  name: String,
  image: String,
  price: String,
  amount: String,
  productId: String,
  userId: String,
  timestamp: Date,
});
const cartItem = mongoose.model("cart", cartSchema);

exports.addCartItem = (data, productId, userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        return cartItem.find({ productId: productId, userId: userId });
      })
      .then((items) => {
        if (items.length === 0) {
          let item = new cartItem(data);
          item.save();
          resolve();
        } else {
          items.map((item) => {
            cartItem
              .findOneAndUpdate(
                { productId: productId, userId: userId },
                { amount: Number(item.amount) + Number(data.amount) }
              )
              .then(() => {
                resolve();
              });
          });
          resolve();
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
        console.log(err);
      });
  });
};

exports.getCartItem = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        return cartItem.find({ userId: userId });
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
exports.deleteItem = (itemId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        cartItem.deleteOne({ _id: itemId }).then(() => {
          resolve();
        });
      })
      .catch((err) => {
        reject("error");
      });
  });
};

exports.deleteAll = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        cartItem.deleteMany({ userId: userId }).then(() => {
          resolve(true);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const orderSchema = mongoose.Schema({
  name: String,
  image: String,
  price: String,
  amount: String,
  status:{
    type:String,
    default:"pendding"
  },
  productId: String,
  userId: String,
  timestamp: Date,
  address:String,
  phone:String
})
const orderItem = mongoose.model("order", orderSchema);
exports.newOrder = (userId,address,phone)=>{
  return new Promise((resolve,reject)=>{
    mongoose.connect(DB).then(()=>{
      return  cartItem.find({userId:userId})
    }).then(items=>{
      for(let item of items){
        let saveOrder = new orderItem({
          name: item.name,
          image: item.image,
          price: item.price,
          amount: item.amount,
          productId: item.productId,
          userId: item.userId,
          timestamp: item.timestamp,
          address:address,
          phone:phone
        })
        saveOrder.save()
        cartItem.deleteMany(userId).then(()=> console.log(true))
        resolve()
      }
    })
  })
}
exports.getOrders = (userId)=>{
  return new Promise((resolve,reject)=>{
    mongoose.connect(DB).then(()=>{
      return  orderItem.find(userId)
    }).then(items=>{
      resolve(items)
    })
})}

exports.deleteOrders = (productId)=>{
  return new Promise((resolve,reject)=>{
    mongoose.connect(DB).then(()=> {
      return orderItem.findOneAndDelete({productId:productId})
    }).then(()=>{
      resolve()
    })
  }).catch(err=>{
    console.log(err)
    reject(err)
  })
}


exports.getAllOrders = ()=>{
  return new Promise((resolve,reject)=>{
    mongoose.connect(DB).then(()=>{
      return orderItem.find({})
    }).then(items=>{
      resolve(items)
    }).catch(err=>{
      console.log(err)
    })
  })
}

exports.saveEditOrder = (id,userId, status)=>{
  return new Promise((resolve,reject)=>{
    mongoose.connect(DB).then(()=>{
      return orderItem.updateMany({_id:id,userId:userId},{status:status})
    }).then(()=>{
      resolve()
    }).catch(err=>console.log(err))
  })
}
exports.deleteOrderAdmin = (id,userId)=>{
  return new Promise((resolve,reject)=>{
    mongoose.connect(DB).then(()=>{
      return orderItem.deleteMany({_id:id,userId:userId})
    }).then(()=>{
      resolve()
    }).catch(err=>console.log(err))
  })
}