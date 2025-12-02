const express=require("express");
const User=require("./model/user.schema");
const e = require("express");
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.post("/sum",(req,res)=>{
    let{a,b}=req.body;
    if(a==undefined || b==undefined){
        return res.json({
            sucess:false,
            message:"invalid argument"
        })
    }
    res.json({
        success:true,
        data:a+b
    })
})
app.post("/api/users/register",(req,res)=>{
    let{name,email,password}=req.body;
    let newUser=new User({
        name,email,password
    })
    await newUser.save()
    res.json({
        sucess:true,
        message
    })
})
module.exports=app;