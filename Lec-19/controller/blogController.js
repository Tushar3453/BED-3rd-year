const Blogs = require("../model/blog"); 
const User = require("../model/user");

module.exports.postaddBlog = async (req, res) => {
    try {
        const { title, body, userId } = req.body;
        const userExist = await User.findById(userId);

        if (!userExist) {
            return res.json({ success: false, message: "User not found" });
        }

        const newBlog = new Blogs({
            title,
            body,
            date: Date.now(),
            userId
        });

        await newBlog.save();

        userExist.blogs.push(newBlog._id);
        await userExist.save();

        res.json({
            success: true,
            data: newBlog,
            message: "Blog added successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports.getreadBlog = async (req, res) => {
    try {
        const allblog = await Blogs.find();
        res.json({
            success: true,
            data: allblog
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports.getOneBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blogs.findById(id);
        res.json({
            success: true,
            data: blog
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports.deleteOneBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { userId } = req.body;

        const blogExist = await Blogs.findById(blogId);
        if (!blogExist) {
            return res.json({
                success: false,
                message: "Blog not found"
            });
        }

        if (blogExist.userId.toString() !== userId) {
            return res.json({
                success: false,
                message: "You are not authorized to delete this blog"
            });
        }

        await Blogs.findByIdAndDelete(blogId);

        const userExist = await User.findById(userId);
        userExist.blogs = userExist.blogs.filter(id => id.toString() !== blogId);
        await userExist.save();

        res.json({
            success: true,
            message: "Blog deleted successfully",
            data: userExist
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
