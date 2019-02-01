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


app.listen(process.env.PORT || 3000)
