const express = require ('express');
const exphbs  = require('express-handlebars');
const bodyParser=require('body-parser');
const mongoose= require ('mongoose');
const app = express();
//Map global promise - get rid of warning 
// Map global promise - get rid of warning
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true}).then(()=>{

}).catch((err)=>{
console.log(err)
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

//Handle bars middleware 
app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

//Body parser  middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//Index route 
app.get('/',(req,res)=>{
  const title='Welcome1';

res.render('index',{
    title:title});
});

//Add ideas  ROute
app.get('/ideas/add',(req,res)=>{
  res.render('ideas/add');
  });



//ABoout ROute
app.get('/about',(req,res)=>{
    res.render('about');
    });

   
//Process from 
app.post('/ideas',(req,res)=>{
  let errors = [];
  if (!req.body.title){
errors.push({text:'Please add a title',
});}

if(!req.body.details){
  errors.push({text:'Please add some details'});
}
if (errors.length >0 ){
  res.render('ideas/add',{
    errors:errors,
    title:req.body.title,
    details:req.body.details,
  });
}else {
  res.send('passed');
}
console.log('this is reqqqquest', req);
console.log('this is response',  res);
})


const port = 9000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
  
}
);
