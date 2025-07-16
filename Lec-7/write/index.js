let users = [
    {
        name: "Tushar",
        age: "24",
        address: "Delhi"
    },
    {
        name: "Rupesh",
        age: "25",
        address: "Panchkula"
    }
];
const fs=require("fs");
fs.writeFile("users.txt",JSON.stringify(users),function(err){
    if(err) return console.log(err);
    console.log("users written!!");
})
