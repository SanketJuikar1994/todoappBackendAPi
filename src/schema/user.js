const mongoose = require('mongoose')
const schema  = mongoose.Schema

const userSchema = new schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number
    },
    accessToken:[{
        type:String,
        
    }]
})

const user= mongoose.model('User',userSchema)

module.exports =user