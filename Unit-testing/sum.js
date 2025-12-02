function sum(a,b){
    if(typeof(a)!="number" || typeof(b)!="number"){
        return "all argument must be number"
    }
    return a+b;
}
module.exports = sum;