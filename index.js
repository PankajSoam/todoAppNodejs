//including libraries
const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

//setting ejs as view engine
app.set('view engine', 'ejs');
// joining 2 paths
app.set('views', path.join(__dirname, 'views'));



app.get('/', function(req,res){
    return res.render('home'); // rendering home.ejs in views folder
    //res.send('it is running');
});


app.listen(port, function(err){
    if(err){
        console.log('error in running the server', err);
    }

    console.log('yup express server is running on port:', port);
});