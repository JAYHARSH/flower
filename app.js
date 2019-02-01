require('./config/config.js');
require('./models/db');
require('./config/passportConfig');

const express =require('express');
const bodyParser=require('body-parser');
const cors= require('cors');
const passport=require('passport');
const rtsIndex=require('./routes/index.router');

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use(passport.initialize());
app.use(express.static('./dist/flower'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,'/dist/flower/index.html'));
});
app.use('/api',rtsIndex);

//error handler 

app.use((err,req,res,next)=>{
    if(err.name==='ValidateErrors')
    {
        var valErrors=[];
        Object.keys(err.errors).forEach(key =>valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
       
    }

});

var port = process.env.PORT || CONFIG.port;
app.listen(port,'0.0.0.0');
