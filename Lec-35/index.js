import {createClient} from "redis";
const client=await createClient();
client.connect();
client.on("error",function(err){
    console.log(err);
})

async function cacheUserProfile(){
    await client.set("user:1",JSON.stringify({name:"Tushar",age:"20"}));
}

async function readProfile(){
    let data= await client.get("user:1")
    return data;
}

// cacheUserProfile()
// .then(()=>console.log("profile cached"))
readProfile().then((data)=>console.log(data))
.catch(e=>console.log(e))