const express = require('express');
const app = express();
const PORT = 3000;
const mongoose=require('mongoose');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
const Blogs=require('./model/blog')

const Users = require("./model/user");
const user = require('./model/user');

let blogRoute = require("./routes/blogRoutes");
let userRoute=require("./routes/usersRoutes");
app.use("/api/users",userRoute)
app.use("/api/blogs",blogRoute)

app.post("/users",async(req,res)=>{
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

app.get("/users",async(req,res)=>{
    let allUsers = await Users.find();
    res.json({
        success: true,
        data: allUsers
    });
})

app.get("/users/:id",async(req,res)=>{
    let {id} = req.params;
    let userExist = await Users.findOne({_id: id}).populate("blogs");
    if(userExist){
        res.json({
        success: true,
        data: userExist
    });
    }
})




app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
//mongoose is odm.
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));
