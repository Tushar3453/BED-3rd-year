const express = require("express");
const router = express.Router();
const Blogs = require("../model/blog");
const { postaddBlog, getreadBlog, getOneBlog, deleteOneBlog } = require("../controller/blogController");

router.post("/", postaddBlog);
router.get("/", getreadBlog);
router.get("/:id", getOneBlog);
router.delete("/:blogId", deleteOneBlog);

module.exports = router;
