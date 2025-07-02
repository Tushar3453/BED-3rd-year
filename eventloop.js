const fs=require("fs");
console.log("start");
setTimeout(()=>{
    console.log("timer callback")
},0)
setImmediate(()=>{
    console.log("Immediate callback")
})

function dosometask(){
    return new Promise((resolve,reject)=>{
        resolve("promise chla")
    })
}

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

.catch((err)=>{
    console.log(err)
})

process.nextTick(()=>{
    console.log("next tick")
})