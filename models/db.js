const mongoose =require('mongoose');

mongoose.connect("mongodb://newuser:mastermind007@ds161894.mlab.com:61894/stackdb",{ useNewUrlParser: true},(err)=>{
if(!err)
{
console.log('Mongodb connection successful');
}
else
{
console.log('Error in Mongodb connection'+JSON.stringify(err,undefined,2));
}
});

require('./user.model');
require('./product.model');

