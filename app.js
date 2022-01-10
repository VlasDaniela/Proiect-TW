const express= require('express');
const morgan= require('morgan');
const mongoose = require('mongoose');
const Produs = require('./models/produs');
const { db } = require('./models/produs');
const Companie = require('./models/companie');



// express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://daniela:1234@nodeclust.hbjwr.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result)=> app.listen(3001))
    .catch((err)=> console.log(err));

//listen 
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/*app.get('/add-produs',(req,res)=>{
    const produs = new Produs({
        title:'Ziant',
        price:'21' ,
        cantitate: '800',
        expir_date: '02.01.2022'
    })
    
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
app.get('/add-s',(req,res)=>{
    const s = new s({
        nume_comp: 'HOFFMANN LA ROCHE',	
        nr_telefon: '0712345678',
        adressa: 'Strada Cetatii',
        nume_manager: 'Moldovan Gabriela'
    })
    
    s.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })
});*/


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
    // console.log(req.body);
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
app.get('/Stock/:id', (req, res) => {
    const id = req.params.id;
    Produs.findById(id)
      .then(result => {
        res.render('Stock');
      })
      .catch(err => {
        console.log(err);
      });
  });
app.delete('/Stock/:id', (req, res) => {
    const id = req.params.id;
    
    Produs.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/Stock' });
      })
      .catch(err => {
        console.log(err);
      });
  });
app.get('/add-produs',(req,res) => {
    res.render('add-produs');
});
app.get('/add-companie',(req,res) => {
    res.render('add-companie');
});