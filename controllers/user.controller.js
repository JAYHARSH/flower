const mongoose= require('mongoose');
const passport=require('passport');
const User=mongoose.model('User');
const Product=mongoose.model('Product');
/*const ShoppingCart=mongoose.model('ShoppingCart');*/
const _ =require('lodash');
var ObjectID= require('mongodb').ObjectID;


/*
module.exports.updatecart=(req,res,next) => {
     var shoppingcart=new ShoppingCart();
     const id = req.params.id.toString();
     //check user id

     console.log('inside update'+id)
     ShoppingCart.findOne({'product':req.body._id},function(err,result){
         if(err)
            console.log(err)
        else
            res.quantity++;
            console.log(result)
     })
    
}

*/





module.exports.product=(req,res,next) => {
        var product = new Product();
        product.productname=req.body.productname;
        product.productprice=req.body.productprice;
        product.imageurl=req.body.imageurl;
        console.log(req.productname);
        product.save((err,doc)=>{
            if(!err)
            {   
                res.send(doc);
            }
            else
            {
                return next(err);
            }
        
        });
};


module.exports.register = (req,res,next) => {
    var user =new User();
    user.fullName=req.body.fullName;
    user.email=req.body.email;
    user.password=req.body.password;
    user.save((err,doc)=>{
        if(!err)
        {
            res.send(doc);
        }
        else{
            if(err.code == 11000)
            {
                res.status(422).send(['Duplicate email address found']);
            }
            else 
            {
                return next(err);
            }
        }
    });
};

module.exports.authenticate = (req,res,next) =>{
    passport.authenticate('local',(err,user,info)=>{
   
     if(err)
     {
        return res.status(400).json(err);
     }
    
     else if(user)
     {
       return res.status(200).json({"token": user.generateJwt()});
     }
     else
     {
         return res.status(404).json(info);
     }
    })(req,res);

}
module.exports.userProfile = (req,res,next) =>{
   /* const id=req._id;
    const details = { _id: new ObjectID(id) };
    User.findOne(details,(err,user)=>{
        res.json({user:user})
        if(!user)
        {
            res.status(404).json({status:false,message:'user record not found'});
        }
        else if(err)
        {
             res.status(400).json(err);
        }
        else
        {
            res.status(200).json({status:true, user: _.pick(user,['_id','fullName','email'])});
        }
    })(req,res);*/
    User.findOne({"_id":req._id},(err,user)=>{
        if(err)
        {
            res.status(404).json({status:false,message:'user record not found'});
        }
        else
        {
            res.status(200).json({status:true, user: _.pick(user,['_id','fullName','email'])});
        }
    });
}

module.exports.catalog = (req,res,next) =>{
    Product.find((err,product)=>{
        if(err)
        {
            res.status(404).json({status:false,message:'product record not found'});
        }
        else
        {
            res.status(200).json(product);
        }
    });}


module.exports.insertcart=(req,res,next) => {
   // var user=new User();
   
    var found;
    var flag=false;
   
    User.findOne({'_id':new ObjectID(req.params.id.toString())},(err,user)=>{
        res.json({user:user});
        if(!user)
        {     
            res.status(404).json({status:false,message:'user record not found'});
        }
        else 
        {   
           if(user.cart.length==0)
           {
            
            user.cart.push({product:req.body._id,quantity:0})
            user.save(function(err,docs){
                res.send(docs)
            })
           }
           else
           {
            user.cart.forEach((item)=>{
                if(item.product==req._id)
                {
                  this.found=item; 
                  this.flag=true; 
                 }
            })
            if(this.flag==false || this.found==undefined)
            {  
            
            user.cart.push({product:req.body._id,quantity:0})
            user.save(function(err,docs){
                res.send(docs)
             })
            }
            else 
            {
                
                
                this.found.quantity++;
            user.save(function(err,docs){
                    if(err)
                    console.log(err)
                    else
                    res.send(docs)
           }) 
             this.flag=false;
            }
            
            
           }
           /*
            user.cart.forEach(item => {
                if(item.product==req.body._id)
                {
                  item.quantity+=1;
        
                }
                else
                {
                    user.cart.push({product:req.body._id,quantity:0})
                    user.save(function(err,docs){
                        if(err)
                        console.log(err)
                        else
                        res.send(docs)
                    })
                }
            });
 
        */
        }
    })(req,res);
    }
 


 
module.exports.findcart = (req,res,next) =>{
    const id = req.params.id.toString(); 
    User.findOne({'_id': new ObjectID(id)}).populate('cart.product').exec(function(err, c) {
        if (err) { return console.log(err); }
        else
        res.send(c.cart)
    });
}
