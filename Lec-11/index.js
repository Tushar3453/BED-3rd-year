//accessing dom element
//1. using id
//2. using class
//3. using tag
//4. querySelector/querySelectorAll

// let el1=document.getElementById("heading");
// console.log(el1);
// let el2=document.getElementsByClassName("item");
// console.log(el2[0]);
// let el3=document.getElementsByTagName("p");
// console.log(el3[0]);

let el4=document.querySelector("p");
let el6=document.querySelectorAll(".item")
let ul=document.querySelector('#container');
// console.log(el4);
// console.log(el5);
// console.log(el6);

//properties
/*
inner text
innerhtml
textcontent
*/
// let data=el4.innerText;          //getter and setter both
// console.log(data);
// el4.innerText="changed using js";
// let data2=ul.innerHTML;
// let data3=ul.innerText;
// let data4=ul.textContent;
// console.log(data2);
// console.log(data3);
// console.log(data4);

ul.innerHTML=`<li class="item">item 4</li>
        <li class="item">item 5</li>
        <li class="item">item 6</li>`

/*
getAttribute
setAttribute
classList
*/
let el5=document.querySelector(".item");
console.dir(el5);
// console.dir(el5.getAttribute("id"));
// console.log(el5.getAttribute("class"));
// el5.setAttribute("id","js");
// console.log(el5.getAttribute("id"));
el5.classList.add("delete")
console.log(el5.classList.contains("delete"));
el5.classList.remove("item");
console.log(el5.classList)
document.querySelector(".SignUp").addEventListener("click",function(){
    document.querySelector("form").style.display="block";
});
