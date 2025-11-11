const {WebSocketServer}=require("ws")
const wss=new WebSocketServer({port:8080});
const { subscriber } = require("./redisClient");
let allsocket=[]


wss.on("connection",function connection(ws){
    console.log("user connected")
    allsocket.push(socket);
    
})

(async function orderbookUpdate(){
    await subscriber.connect();
    await subscriber.SUBSCRIBE("book_update",(message)=>{
        let parsedMessage=JSON.parse(message);
        broadcast(JSON.stringify(parsedMessage));
    })
})() //IIFE - immediately invoking function
function broadcast(){
    allsocket.forEach((s)=>{
        s.send(message)
    })
}