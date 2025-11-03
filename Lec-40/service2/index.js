let {createClient}=require("redis");
let client=createClient();

async function notify_me(){
    await client.SUBSCRIBE("notify_me",(message)=>{
        console.log(message)
    })
}
setTimeout(()=>{
    notify_me()
},2000)


client.connect()
.then(()=> console.log("redis connected"))