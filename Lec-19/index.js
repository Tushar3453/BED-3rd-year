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




app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
//mongoose is odm.
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));
