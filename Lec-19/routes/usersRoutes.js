const express=require("express");
const router=express.Router();

app.post("/",async(req,res)=>{
    let {email,username,password} = req.body;
    let newUser = new Users({
        email:email,
        username:username,
        password:password
    })
    await newUser.save()
    res.json({
        success: true,
        data: newUser,
        message: "User created successfully"
    });
})

app.get("/",async(req,res)=>{
    let allUsers = await Users.find();
    res.json({
        success: true,
        data: allUsers
    });
})

app.get("/:id",async(req,res)=>{
    let {id} = req.params;
    let userExist = await Users.findOne({_id: id}).populate("blogs");
    if(userExist){
        res.json({
        success: true,
        data: userExist
    });
    }
})
module.exports=router

