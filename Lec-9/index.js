const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello");
});

app.post('/home', (req, res) => {
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
    // allUser.push(userData)

    // fs.appendFile("users.json",JSON.stringify(allUser),function(err){
    //     if(err){
    //         return res.send(err);
    //     }
    //     else {
    //         console.log("Successful");
    //         res.json({
    //             Username: username,
    //             Password: password
    //         });
    //     }
    // });
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});
