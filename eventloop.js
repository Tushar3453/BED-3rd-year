const fs=require("fs");
console.log("start");
setTimeout(()=>{
    console.log("timer callback")
},0)
setImmediate(()=>{
    console.log("Immediate callback")
})

fs.readFile("demo.txt",(data)=>{
    console.log("poll phase callback");
    setTimeout(()=>{
        console.log("timer 2")
    },0)
    setImmediate(()=>{
        console.log("immd2")
    })
})
console.log("end")