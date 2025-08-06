const ul = document.querySelector(".user-container");
let registerform=document.querySelector(".register");
console.log(registerform)
let nameInput=document.querySelector(".name");
let userNameInput=document.querySelector(".username");
function getUsersData(URL){
    fetch(URL)
    .then((res)=>{
        console.log(res)
        return res.json()
    })
    .then((data)=>{
        console.log(data)
        data.forEach(user => {
            displayUser(user)
        });
    })
    .catch((err)=>{
        console.log(err)
    })
}

function displayUser(user){
    const li = document.createElement("li");
    li.innerHTML=`
     <li class="user-item" style="display:flex">
        <div class="user-info">
            <h1>${user.name}</h1>
            <p>${user.username}</p>
        </div>
        <div class="user-btn">
            <button class="user-delete">❤️</button>
            <button class="user-edit">🤣</button>
        </div>
    </li>
    `
    ul.appendChild(li);
}
getUsersData("http://localhost:3000/users")

function addUser(name,username,URL){
    let data={
        name:name,
        username:username
    }
    fetch(URL,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            'content-type':'application/json'
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
        if(data.success){
            alert("user registered successfully")
            nameInput.value="";
            userNameInput.value="";
        }
        else{
            alert(data.error)
            nameInput.value="";
            userNameInput.value="";
        }
    })
}
registerform.addEventListener("submit",function(e){
    e.preventDefault();
    let name=nameInput.value;
    let username=userNameInput.value;
    addUser(name,username,"http://localhost:3000/adduser")
})