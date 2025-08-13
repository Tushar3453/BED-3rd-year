const express = require('express');
const app = express();
const PORT = 3000;
const mongoose=require('mongoose');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
const Blogs=require('./model/blog')

app.post("/blogs",async(req,res)=>{
    let {title,body,userId}=req.body;
    let userExist=await user.findById(userId);
    if(userExist){
        let newBlog=new Blogs({
        title:title,
        body:body,
        date:Date.now(),
        userId:userId
    })
    await newBlog.save()
    userExist.blogs.push(newBlog._id);
    await userExist.save();
    res.json({
        success:true,
        data:newBlog,
        message:"blog added successfully"
    })
    }
})
app.get("/blogs", async(req,res)=>{
    let allblog=await Blogs.find();
    res.json({
        success:true,
        data:allblog
    })
})
app.get("/blogs/:id",async(req,res)=>{
    let {id}=req.params;
    let blog=await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })

})

const Users = require("./model/user");
const user = require('./model/user');

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

//delete blog
app.delete("/blogs/:blogId",async(req,res)=>{
    let {blogId}=req.params;
    let {userId}=req.body;
    let blogExist=await Blogs.findById(blogId);
    if(!blogExist){
        return res.json({
            success:false,
            message:"blog not found"
        })
    }
    if(blogExist.userId!=userId) return res.json({
        success:true,
        message:"You can delete this blog"
    })
    await Blogs.findByIdAndDelete(blogId);
    let userExist=await user.findById(userId);
    let blog=userExist.blogs.filter((id)=>id!=blogId)
    userExist.blogs=blog;
    await userExist.save();
    res.json({
        success:true,
        message:"blog deleted successfully",
        data:userExist
    })

    
})

//update blog
app.put("/blogs/:blogId",async (req,res)=>{
    let {blogId} = req.params;
    let {title,body} = req.body;
    let blog = await Blogs.findById(blogId);
    if(!blog){
        return res.json({
            success:false,
            message:"Blog not found"
        })
    }
    blog.title = title;
    blog.body = body;
    await blog.save();
    res.json({
        success:true,
        message:"Blog updated successfully",
        data:blog
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
//mongoose is odm.
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));
