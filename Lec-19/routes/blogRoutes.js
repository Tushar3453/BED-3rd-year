const express=require("express");
const router=express.Router()

router.post("/",async(req,res)=>{
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
router.get("/", async(req,res)=>{
    let allblog=await Blogs.find();
    res.json({
        success:true,
        data:allblog
    })
})
router.get("/:id",async(req,res)=>{
    let {id}=req.params;
    let blog=await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })

})

router.delete("/:blogId",async(req,res)=>{
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

router.put("/:blogId",async (req,res)=>{
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


module.exports=router