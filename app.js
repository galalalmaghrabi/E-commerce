const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = process.env.PORT || 3005;

/* =============== nodemon ============== */

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
setTimeout(() => {
    liveReloadServer.refresh("/");
}, 100);
});

/* =============== end nodemon ============== */
/* =============== ejs & public ============== */

    app.set("view engine", "ejs");
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.static(path.join(__dirname, '/images')));


/* =============== end & public ============== */



/* =============== start app ============== */


/* =============== end app ============== */

/* =============== session & store============== */
const session = require('express-session')
const sessionStore = require("connect-mongodb-session")(session)
const flash = require('connect-flash')

const store = new sessionStore({
uri:"mongodb+srv://galal:galal@cluster0.tamoq.mongodb.net/E-commerce?retryWrites=true&w=majority",
collection:"sessions",
})
app.use(session({
  secret:"Almaghraby Here !!",
  saveUninitialized:false,
  store:store,
  resave:false
}))

app.use(flash())
/* =============== start main page ============== */
const authPages = require("./routes/auth.router")
const homePage = require("./routes/home.router")
const productDetails = require("./routes/product.router")
const cart = require("./routes/cart.router")
const admin = require("./routes/admin.router")

app.use(homePage)
app.use(authPages)
app.use(productDetails)
app.use(cart)
app.use(admin)


/* =============== end main page ============== */












/* =============== start 404 ============== */

  app.use((req, res, next) => {
    res.status(404).render("error-page",{
      isUser:req.session.userIs,
      isAdmin:req.session.isAdmin,
      title:"page not found"
    });
  });

/* =============== End 404 ============== */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});