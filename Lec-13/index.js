const express = require('express');
const app = express();
const fs=require('fs');
const PORT = 3000;
app.use(express.static(__dirname+"/public"))

app.get('/users', (req, res) => {
  fs.readFile("./Lec-13/users1.json","utf-8",function(err,data){
    if(err) res.send(err);
    let allusers=JSON.parse(data);
    res.json(allusers);
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
