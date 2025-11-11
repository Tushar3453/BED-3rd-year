const OrderBook = require("../service/order");
let ob=new OrderBook("BTCUSD"); //global object
const { publisher } = require("../../shared/index");

module.exports.postPlaceOrder=async (req,res)=>{
    let{side,type,price,quantity,user}=req.body;
    let response=ob.placeOrder(side,type,price,quantity,user);
    publisher.PUBLISH("book_Update",JSON.stringify(response.book))
    req.json({
        event:"orderupdate",
        data:{
            orderReport:response.result, 
            book:response.book
        }
    })

}