const Principal = require("../principal");

function suspend(studentName){
    // let principal=new Principal("Tushar");
    // let principal2=new Principal("Sardaar");   // not possible
    let principal=Principal.getPrincipal();
    Principal.suspend(studentName);
}

function notify(){
    // let principal=new Principal("smiley"); // not possible
    // principal.notify("school band rahenge")

}