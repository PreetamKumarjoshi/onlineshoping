const Sequelize         = require("sequelize");
const sequelize         = require("../util/database");

const Cart              = sequelize.define("cart",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
});

module.exports = Cart;




// const fs            = require("fs");
// const path          = require("path");
// const p             = path.join(path.dirname(process.mainModule.filename),"data","cart.json");

// const getAllProduct = (cb)=>{
//     fs.readFile(p,(error,fileContent)=>{
//         let ItemsReturn = [];
//         if(error){
//             cb([]);
//         }
//         ItemsReturn = JSON.parse(fileContent);
//          cb(ItemsReturn);
//         //return ItemsReturn;
//     });
// }

// module.exports = class Cart{
    
//     static addProduct(id,productPrice){
//         fs.readFile(p,(error,filecontent)=>{
//             let cart={products:[],totalPrice:0};
//             if(!error){
//                 cart= JSON.parse(filecontent);
//             }
//             const existingProductIndex = cart.products.findIndex(prod=>prod.id==id);
//             const existingProduct = cart.products[existingProductIndex];
//             let updatedProduct;    
//             if(existingProduct){
//                 updatedProduct = {...existingProduct};
//                 updatedProduct.qty = updatedProduct.qty+1;
//                 cart.products = [...cart.products];
//                 cart.products[existingProductIndex] = updatedProduct;
//             }
//             else {
//                 updatedProduct = {id:id,qty:1}
//                 cart.products   = [...cart.products,updatedProduct];
//             }
//             cart.totalPrice = Number(cart.totalPrice)+ Number(productPrice);
//             fs.writeFile(p,JSON.stringify(cart), err=>{
//                 console.log(err);
//             });
            
//         });

//     }

//     static fetchAllCart(cb){
//         getAllProduct(cb);
//     }

//     static deleteProduct(productId){
//         getAllProduct((products)=>{
//             const updatedProducts = products.filter(prod => prod.id !== productId);
//             fs.writeFile(p,JSON.stringify(updatedProducts),(error)=>{
//                 if(!error){
                    
//                 }
//             });

//         }); 
//     }
// }