const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static(__dirname+"/public"))

// app.get('/', (req, res) => {
//     res.sendFile(__dirname+"/index.html");
// });
// app.get('/about', (req, res) => {
//     res.sendFile(__dirname+"/about.html");
// });

app.post('/submit',(req,res)=>{
    const {username,password}=req.body;
    res.json({
        Username:username,
        Password:password
    })
})

app.listen(port, () => {
    console.log("Server started on port " + port);
});
