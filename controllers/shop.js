const Product               = require("../models/product");
const Cart                  = require("../models/cart");
const User                  = require("../models/user");

exports.getProducts         = (req,res,next)=>{
    Product.findAll().then(function(rows){
        res.status(200).render("shop/product-list",{pageTitle:"Products", items:rows, path:"/products"});
      }).catch(function(err){
        console.log('Oops! something went wrong, : ', err);
      });
    //    Product.fetchAll()
//    .then(([rows,fileData])=>{
//     res.status(200).render("shop/product-list",{pageTitle:"Products", items:rows, path:"/products"});
//    })
//    .catch(error=>{ console.log("getProducts shop.js controllers error");});
    
    
}


exports.getIndex = (req,res,next)=>{
    Product.findAll().then(function(rows){
        res.status(200).render("shop/index",{pageTitle:"Products", items:rows, path:"/"});
      }).catch(function(err){
        console.log('Oops! something went wrong, : ', err);
      });
    // Product.fetchAll()
    // .then(([rows,fileData])=>{
    //     console.log("inside getIndex method");
    //     res.status(200).render("shop/index",{pageTitle:"Products", items:rows, path:"/"});
    // })
    // .catch();

        
}


exports.getCart = (req,res,next)=>{


    User.getCart()
    .then(cart=>{
        console.log(cart);
    })
    .catch(error=>{console.log(error);});
    console.log("get cart mathod");
    Cart.fetchAllCart((items)=>{
        console.log(items);
        res.render("shop/cart",{"pageTitle":"Cart","path":"/cart",items:items.products});
    });
}


exports.getCheckout = (req,res,next)=>{
    res.render("shop/checkout",{"pageTitle":"Checkout","path":"/shop/checkout"});
}


exports.postCart   = (req,res,next)=>{
    const productId         = req.body.productId;
    const productPrice      = req.body.productPrice;
    Product.findByPk((product)=>{
        Cart.addProduct(productId,productPrice);
    },productId);
    //Cart.addProduct(productId,productPrice);
    res.redirect("/cart");
}

exports.productDetail = (req,res,next)=>{
    
    Product.findByPk(req.params.productId)
    .then((rows)=>{
        console.log("ROWS DATA1111=",rows);
        res.status(200).render("shop/product-detail",{"pageTitle":"ProductDetail","path":"/shop/product-detail","item":rows[0]});
    })
    .catch();    
} 


exports.postCartDeleteProduct = (req,res,next)=>{
    Cart.deleteProduct(req.body.productId);
}