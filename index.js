//including libraries
const express = require('express');
const path = require('path');
//const { NONAME } = require('dns');
const port = 8000;

//importing database
const db= require('./config/mongoose');

//importing schema
const Task = require('./models/tasks');

const app = express(); 

//setting ejs as view engine
app.set('view engine', 'ejs');

// joining 2 paths
app.set('views', path.join(__dirname, 'views'));

//adding parser(a middleware)
app.use(express.urlencoded());

//accessing static files
app.use(express.static('assets'));

// var taskList= [
//     {
//         name: "singing",
//         category: "home",
//         date: "2020/6/6"
        
//     },

//     {
//         name: "writing",
//         category: "school",
//         date: "2020/6/6",
//     }
// ]


//rendering detailed view page
app.get('/', function(req,res){
    Task.find({}, function(err, task){
        if(err){
            console.log('error in fetching data from db');
            return;
        }

        return res.render('home', { 
            title: "Todo List ", 
            task: task 
        }); 
    })
    // rendering home.ejs in views folder
    
    //res.send('it is running');
});


//function to create task
app.post('/create-task', function(req,res){
    Task.create({
        name: req.body.name,
        date: req.body.date,
        category: req.body.category,
    }, function(err, newtask){
        if(err){
            console.log("error in creating task", err); 
            return;
        }
        return res.redirect('back');

    });


    
    //console.log(req.body.date);
    //console.log(req);
    //return res.redirect('/weeklyView');
});

//deleting 
app.get("/delete-task", function(req,res){

    var id = req.query;

    var count = Object.keys(id).length;
    for(let i =0;i<count; i++){
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
            if(err){
                console.log('error in deleting task', err);
            }
        });
    }
    return res.redirect('back');
});



//making app to listen on port
app.listen(port, function(err){
    if(err){
        console.log('error in running the server', err);
    }

    console.log('yup express server is running on port:', port);
});