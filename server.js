const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');

app.use((req,res,next)=>{
var now=new Date().toString();
var log=`${now}:${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log +'\n',(err)=>{
if(err){
    console.log('Unable to append into log file');
}
});
next();
});

// app.use((req,res,next)=>{
// res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('ScreamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    // res.send('Hello! This is Express');
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMsg:'Welcome to Express'
    })
    });
    app.use(express.static(__dirname+'/public'));

    app.get('/about',(req,res)=>{
    // res.send('Hello! This is About Page');
res.render('about.hbs',{
    pageTitle:'About Page',
});
    });


    app.get('/bad',(req,res)=>{
        // res.send('Hello! This is Express');
        res.send({
            errrorMessage: 'Unable to  handle request'
        });
        });
app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});