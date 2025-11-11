const OrderBook = require("../service/order");
let ob=new OrderBook("BTCUSD"); //global object
const { publisher } = require("../../shared/index");

module.exports.postPlaceOrder=async (req,res)=>{
    let{side,type,price,quantity,user}=req.body;
    let response=ob.placeOrder(side,type,price,quantity,user);
    const book = ob.getBookSnapShot();
    await publisher.connect();
    await publisher.PUBLISH("book_Update",JSON.stringify(book))
    res.json({
        event:"orderupdate",
        data:{
            orderReport:response, 
            book:book
        }
    })

}

module.exports.getOrderbook=async (req,res)=>{
    let bookSnapshot=ob.getBookSnapShot();
    return res.json(bookSnapshot);
        
}

module.exports.getRecentTrades=async (req,res)=>{
    let {limit}=req.query;
    let recentTrades=ob.getRecentTrades(limit);
    return res.json(recentTrades);
        
}