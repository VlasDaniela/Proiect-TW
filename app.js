const express= require('express');
const morgan= require('morgan');
const mongoose = require('mongoose');
const Produs = require('./models/produs');
const { db } = require('./models/produs');
const Companie = require('./models/companie');
const User = require('./models/user');



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
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/',(req,res) => {
    res.render('account');
});
app.get('/index',(req,res) => {
    res.render('index');
});
app.get('/despre',(req,res) => {
    res.render('despre');
});
app.get('/coscumparaturi',(req,res) => {
    res.render('coscumparaturi');
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
    db.collection('produs').find().toArray()
        .then((results)=>{
            res.render('Stock.ejs',{ produs: results})
        })
        .catch((err)=>{
            console.log(err);
        })
   /* res.render('Stock');*/
});
app.post('/Stock', (req, res) => {
    console.log(req.body);
    const produs = new Produs(req.body);
  
    produs.save()
      .then(result => {
        res.redirect('/Stock');
      })
      .catch(err => {
        console.log(err);
      });
    
  });
  app.post('/customers', (req, res) => {
    // console.log(req.body);
    const companie= new Companie(req.body);
  
    companie.save()
      .then(result => {
        res.redirect('/customers');
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/customers',(req,res) => {
    db.collection('companies').find().toArray()
    .then((results)=>{
        res.render('customers.ejs',{ companie: results})
    })
    .catch((err)=>{
        console.log(err);
    })
    // res.render('customers');
});
app.get('/add-produs',(req,res) => {
    res.render('add-produs');
});
app.get('/register',(req,res) => {
    res.render('register.ejs');
});
app.post('/register',(req,res) => {
   console.log(req.body);

   const user= new User(req.body);
  
    user.save()
      .then(result => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
});
app.post('/login',(req,res) => {
    db.collection('users').find({nume:req.body.nume},{parola:req.body.parola}).toArray()
    .then((result)=>{
        console.log(result);
        if(result && result.length)
            {res.redirect('/produse')}
        else
            {res.redirect('/')}
    })
    .catch((err)=>{
        console.log(err);
    })

});
app.get('/add-companie',(req,res) => {
    res.render('add-companie');
});
app.get('/stock/delete/:id',(req,res) => {
    console.log(req.params.id)
    db.collection("produs").remove({
        _id:req.params.id
    })
    .then((result)=>{
        console.log(result);
        res.redirect("/stock")
    })
    .catch((err)=>{
        console.log(err);
    })
});





