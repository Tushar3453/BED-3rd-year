const express = require('express');
const app = express();
const fs=require('fs');
const PORT = 3000;
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.use(express.json())
app.get('/users', (req, res) => {
  fs.readFile("./Lec-15/users1.json","utf-8",function(err,data){
    if(err) res.send(err);
    let allusers=JSON.parse(data);
    res.json(allusers);
  })
});

app.post("/adduser",(req,res)=>{
  try {
    let name=req.body.name;
    let username=req.body.username;
    let newUser={
      id:Math.floor(Math.random()*1000000),
      name:name,
      username:username,
      role:"user"
  }

  let alluser=[];
  let data=fs.readFileSync("./Lec-15/users1.json","utf-8");
  if(data){
    alluser=JSON.parse(data);
  }
  alluser.push(newUser);
  fs.writeFileSync("./Lec-15/users1.json",JSON.stringify(alluser))
  res.json({
    success: true,
    data: alluser,
  })

  } catch (error) {
    return res.send({
      success: false,
      error:"something went wrong while adding user",
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
