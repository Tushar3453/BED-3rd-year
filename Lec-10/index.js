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

app.post('/submit', (req, res) => {
    let allUser=[];
    const { username, password } = req.body;

    const userData = {
        username,
        password
    };
    fs.readFile("users.json","utf-8",function(err,data){
        if(err) return res.json({
            error:err
        })
        if(data && data.length>0){
            allUser=JSON.parse(data);
        }
        allUser.push(userData);
        fs.writeFile("users.json",JSON.stringify(allUser),function(err){
            if(err) return res.send(err)
            console.log("Successful");
        res.json({
            Username: username,
            Password: password
        });
            
    })
})
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});
