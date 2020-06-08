const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todoapp',{useNewUrlParser: true,
useUnifiedTopology: true,},(error,response)=>{
    if(error){
        console.log("DataBase not connected")
    }else{
        console.log("Connection successful!!!")
    }
})