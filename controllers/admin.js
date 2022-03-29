
const Product           = require("../models/product");
const path=require("path");


exports.getAddProduct       = (req,res,next)=>{
    res.status(200).render("admin/edit-product",{"pageTitle":"Add-product","editState":false});
}

exports.postAddProduct      = (req,res,next)=>{

    
    const title         = req.body.title;
    const imageUrl      = req.body.imageUrl;
    const description   = req.body.description;
    const price         = req.body.price;
    const id            = req.body.id;
    req.user.createProduct({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price
    })
    // Product.create({
    //     title:title,
    //     description:description,
    //     imageUrl:imageUrl,
    //     price:price
    // })
    .then(result=>{res.redirect("/");})
    .catch(error=>{console.log(error);});
    
}


exports.getProducts = (req,res,next)=>{
   
    Product.findAll().then(function(rows){
        res.status(200).render("admin/products",{"pageTitle":"AdminProducts","items":rows});
      }).catch(function(err){
        console.log('Oops! something went wrong, : ', err);
      });
} 


exports.editproduct = (req,res,next)=>{
    let productId   = req.params.productId;
    if(productId) 
    {
        
        req.user.getProducts(
                                {
                                    where:
                                    {
                                        id:productId
                                    }
                                })
        // let item    = Product.findByPk(productId)
                        .then((row)=>{
                            res.status(200).render("admin/edit-product",{"pageTitle":"Edit-product","item":row[0],"editState":true});
                        })
                        .catch(error=>{console.log("edit product error");});
    }
    console.log("let me check editproduct",req.params.productId);
}


exports.postDeleteProduct = (req,res,next)=>{
    const productId = req.body.productId;
    Product.findByPk(productId)
        .then(product=>{
            return product.destroy();
        })
        .then(result=>{
            console.log("DESTORY PRODUCT");
            res.redirect("/admin/products");
        })
        .catch(error=>{console.log(error);});
        console.log("deleteproduct",productId);
}


exports.postEditProduct = (req,res,next)=>{
    const title         = req.body.title;
    const imageUrl      = req.body.imageUrl;
    const description   = req.body.description;
    const price         = req.body.price;
    const id            = req.body.id;
    Product.findByPk(id)
    .then(product=>{
        product.title           = title;
        product.imageUrl        = imageUrl;
        product.description     = description;
        product.price           = price;
        return product.save();
    })
    .then(result=>{
        console.log(result);
        res.redirect("/admin/products");
    })
    .catch(error=>{console.log(error)})
    Product.create({
        id:1,
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price
    })
    .then(result=>{res.redirect("/");})
    .catch(error=>{console.log(error);});
       
}