const express= require('express');
const morgan= require('morgan');
const mongoose = require('mongoose');
const Produs = require('./models/produs');
const { db } = require('./models/produs');



// express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://daniela:1234@nodeclust.hbjwr.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));

//listen 
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/add-produs',(req,res)=>{
    const produs = new Produs({
        title:'ColdrexGripaSiRaceala',
        price:'13.5' ,
        cantitate: '3'
    });

    produs.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })
});
app.get('/all-produse',(req,res)=>{
    Produs.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })
});


app.get('/',(req,res) => {
    res.render('account');
});
app.get('/index',(req,res) => {
    res.render('index');
});
app.get('/produse',(req,res) => {
    db.collection('produs').find().toArray()
        .then((results)=>{
            res.render('produse.ejs',{ produs: results})
        })
        .catch((err)=>{
            console.log(err);
        })
    /*res.render('produse');*/
});
app.get('/Stock',(req,res) => {
    res.render('Stock');
});
app.get('/customers',(req,res) => {
    res.render('customers');
});