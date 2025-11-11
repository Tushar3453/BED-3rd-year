const{createClient}=require("redis")

let publisher=createClient();
let subscriber=createClient();

publisher.connect()
.then(()=>{
    console.log("publisher connected")
})
subscriber.connect()
.then(()=>{
    console.log("subscriber connected")
})

module.exports={
    publisher,
    subscriber
}