var express = require('express')
var router = express.Router()
const userModel = require('../model/user')
    
router.post('/saveUser',async(req,res)=>{
    try{
        const user = await userModel.saveUser(req.body)
        res.status(200).send(user)
    }catch(e){
        res.status(400).send("User Already Registered!!!")
    }
}),

router.post('/login',async(req,res)=>{
    try{
            const userlogin =await userModel.login(req.body)
            console.log("userlogin",userlogin)
           
            if(typeof(userlogin)==="object"){
                console.log("11111")
                res.status(200).send(userlogin)
            }
    }catch(e){
        console.log("2222")
        res.status(400).send("Unable to login!!!")
    }
}),
router.post('/logout',async(req,res)=>{
    try{
        userLogout =await userModel.logout(req.body)
        res.status(200).send("User logged Out")
    }catch(e){
        res.status(400).send("Unable to logout")
    }
})

router.get('/getAllUser',async(req,res)=>{
    try{
        const user = await userModel.getAllUser()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
}),

router.post('/getUser',async(req,res)=>{
    try{
               var user = await userModel.getUser(req.body)
        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
    }
}),

router.post('/userUpdate',async(req,res)=>{
    try{
        const user = await userModel.userUpdate(req.body)
        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
    }
}),

router.post('/deleteUser',async(req,res)=>{
    try{
        const userDelete =await userModel.userDelete(req.body)
        res.status(200).send(userDelete)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router