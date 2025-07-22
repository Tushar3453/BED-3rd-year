const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Home Page</h1>'); //response header set hota hai
  res.send("Hello World");
  res.sendFile(__dirname + '/index.html');
  res.json({
    name: "John Doe",
    age: 30,
  })
  res.end("hi");//response header set nhi hota
});

//path-variable
//1. Query Parameter
app.get("/watch",(req, res) => {
    let videoId=req.query.v;
    let nId = req.query.n;
    res.send("id got it"+" "+videoId+" "+nId);
});

//2.Params
app.get("/watch/:v/",(req, res) => {
    console.log(req.params.v);
    res.send("id got it");
});

app.listen(3000,function(){
    console.log("Server started");
});