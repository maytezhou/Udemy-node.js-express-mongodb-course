const express = require ('express');
const exphbs  = require('express-handlebars');



const app = express();
//Handle bars middleware 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//how middleware works
app.use(function(req,res,next){
/* console.log(Date.now()); */
req.name='Mayte Souza';

next();
})

//Index route 
app.get('/',(req,res)=>{
  
res.render('index');
});

//ABoout ROute
app.get('/about',(req,resp)=>{
    resp.render('ABOUT');
    });

   
const port = 5000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
  
}
);
