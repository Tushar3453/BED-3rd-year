const ul = document.querySelector(".user-container");
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