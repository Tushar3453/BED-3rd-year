//1. create a new element using createElement function
//2. add data in that element either using .innerText or innerHTML
//3. insert new element in parent container using appendChild or append

let todo={
    id:234,
    title:"bhaande maanjh lawo"
}

let todoContainer=document.querySelector(".todocontainer");

function addTodo(todo){
    let li=document.createElement("li");
    li.innerHTML=`<div>
                <input type="checkbox" name="" id="">
                <h1>${todo.title}</h1>
                <div>
                    <button>😘</button>
                    <button>❤️</button>
                </div>
            </div>`
            todoContainer.appendChild(li);
}
addTodo(todo);
function showAllTodos(todos){
    todos.forEach(todo=>{
        addTodo(todo)
    });
}
showAllTodos(todos);