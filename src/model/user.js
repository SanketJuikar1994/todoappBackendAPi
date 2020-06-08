const User = require('../schema/user')
const bcrypt =require('bcrypt')
var jwt = require('jsonwebtoken');

module.exports ={
    saveUser : async (data)=>{
        const userData=await User.findOne({email:data.email})
        console.log("usewData",userData)
        if(userData==null){
            console.log("in if")
            var bcryptpass=await bcrypt.hash(data.password, 8)   
               data.password=bcryptpass
               const user = new User(data)
              return user.save(data)
        }else{
            throw new Error('User Alredy Registered') 
        }
    },

    login:async(data)=>{
        const userData =await User.findOne({email:data.email})
        if(userData){
          var isMatchPassword=await bcrypt.compare(data.password, userData.password)
        
          if(isMatchPassword){
              console.log("password match",isMatchPassword)
              console.log("userData",userData)
              var token=await jwt.sign({_id:userData._id},'myaccessToken')
             console.log("accessToken",token)
             userData.accessToken.push(token)
             console.log("accessToken after pushing",userData)
           var test= await User.updateOne({_id:userData._id},{
               $set:userData
           })
             
              return(userData)
          }else{
            
            return new Error('Unable to login')
          }
        }else{
            return new Error('Unable to login')
        }

    },

    logout:async(token)=>{
        const verifyToken = jwt.verify(token.accessToken,'myaccessToken')
        var userData = await User.findOne({_id:verifyToken._id,'accessToken':token.accessToken})
        if(userData){
        var tokenArray =await userData.accessToken.filter(function(x){
           return x != token.accessToken     
        })
        userData.accessToken=tokenArray
        var userDataAfterLogout = await User.updateOne({_id:token._id},{
            $set:userData
        })
        return(userData)
    }else{
        throw new Error("Unable to logout")
         }
    },

    getAllUser:async(data)=>{
        return await User.find({})
     },
 
     getUser:async(data)=>{
         console.log(data)
         return await User.findOne({_id:data._id})  
     },
 
     userUpdate:async(data)=>{
         // console.log("222",users)
         return await User.updateOne({_id:data.id},{
             $set:data
             
         })
       
     },

     userDelete:async(data)=>{
         console.log("userDelete data")
         return await User.deleteOne({_id:data.id})
     }
 
    
}