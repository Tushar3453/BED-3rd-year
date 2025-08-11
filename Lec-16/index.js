const express = require('express');
const app = express();
const PORT = 3000;
const mongoose=require('mongoose');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
const Blogs=require('./model/user')

app.post("/blogs",async(req,res)=>{
    let {title,body}=req.body;
    let newBlog=new Blogs({
        title:title,
        body:body,
        date:Date.now()
    })
    await newBlog.save()
    res.json({
        success:true,
        data:newBlog,
        message:"blog added successfully"
    })
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

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
//mongoose is odm.
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));
