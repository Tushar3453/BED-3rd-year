const OrderBook = require("../service/order");
let ob=new OrderBook("BTCUSD"); //global object

module.exports.postPlaceOrder=async (req,res)=>{
    let{side,type,price,quantity,user}=req.body;
    let response=ob.placeOrder(side,type,price,quantity,user);
    console.log(response)
    res.send(response);

}