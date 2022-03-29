const express           = require("express");
const bodyParser        = require("body-parser");
const ejs               = require("ejs");
const sequelize                = require("./util/database");

const app               = express();


//5 website and 5 android app to banwa deta or live karna h 

app.use(bodyParser.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set("views","views");

const adminroutes       = require("./routes/admin");
const shoproutes        = require("./routes/shop");


const productsController= require("./controllers/error");
const error             = require("./controllers/error");
//const { FORCE }         = require("sequelize/types/index-hints");
const Product           = require("./models/product");
const User              = require("./models/user");
const Cart              = require("./models/product");
const CartItem          = require("./models/cart-item");

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(error=>{
        console.log(error);
    });
});

app.use("/admin",adminroutes);
app.use(shoproutes);
app.use(error.error404);


User.hasOne(Cart);
Cart.belongsTo(User);

Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);

//User.belongsTo(Cart,{constraints:true, onDelete:'CASCADE'});  




Cart.belongsToMany(Product,{as: 'product',through:CartItem});
Product.belongsToMany(Cart,{as: 'cart',through:CartItem});




sequelize
.sync({force:true})
.then(result=>{
    return User.findByPk(1);
})
.then((user)=>{
    if(!user){
       return User.create({username:'preetam',email:"preetam@gmail.com"});
    }
    return user;
})
.then(user=>{
    app.listen(3000,()=>{
        console.log("listning from port 3000....!");
    });
   //return User.createCart();
})
// .then(cart=>{
//     app.listen(3000,()=>{
//         console.log("listning from port 3000....!");
//     });
// })
.catch(error=>{
    console.log(error);
});


