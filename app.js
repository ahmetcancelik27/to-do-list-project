const form = document.querySelector(".todo_form");
const input = document.querySelector(".todo_input");
const todo_container = document.querySelector(".todo_container");

const startConf = () => {
    // baslangic ayarlari
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos) {
        localStorage.setItem("todos", JSON.stringify([]));
    } else {
        todos.forEach(todo => {
            addHTML(todo);
        });
    }
}

const addTodo = (e) => {
    e.preventDefault();

    const inputVal = input.value;
    
    if (inputVal == '') { // boş değer girilmeye çalışıyor ise hata veriyoruz
        input.style.border = '1px solid gray';
        
        setTimeout(() => {
            input.style.borderColor = 'transparent';
        }, 2000);
        return false;
    }

    const todo = {
        text: inputVal,
        isCompleted: false,
    };

    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    addHTML(todo);

    form.reset();
}

const deleteTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;
    const container = e.target.parentElement.parentElement.parentElement;
    todo.setAttribute("id","todo_deleteanimation")
    todo.removeAttribute("id" , "todo_deleteanimation")


    todo.style.opacity ="0"
    todo.style.transition = "0.3s linear";
    
    setTimeout(()=>{
        todo.remove()
        container.style.transition= "height 1s"
    },300)
    


    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(td => td.text != text);
    localStorage.setItem("todos", JSON.stringify(todos));

    
}

const completeTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;

    let todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach(td => {
        if (td.text === text) td.isCompleted = !td.isCompleted
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

const saveTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const prevText = todo.firstChild.children[1].textContent; // değiştirilmeden önceki değer
    const newText = todo.firstChild.children[2].value; // editlerken girdiğimiz yeni değer

    const editInput = e.target.parentElement.parentElement.firstChild.children[2]
    editInput.style.display ="none"

    const oldInput = e.target.parentElement.parentElement.firstChild.children[1]
    oldInput.style.display ="inline"

    const deleteButton = e.target.parentElement.children[0];
    deleteButton.style.display = "inline"

    const editButton = e.target.parentElement.children[1];
    editButton.style.display ="inline"

    const saveBtn = e.target.parentElement.children[2];
    saveBtn.style.display ="none"

    let todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach(td => {
        if (td.text === prevText) td.text = newText;
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    todo.firstChild.children[1].textContent = newText;  // HTML üzerindeki değerini de değiştiriyoruz

    todo.classList.remove("-edited"); // verdiğimiz classı kaldırıyoruz
}

const editTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    
    const deleteButton = e.target.parentElement.children[0];
    deleteButton.style.display = "none"

    const editButton = e.target.parentElement.children[1];
    editButton.style.display ="none"

    const saveButton = e.target.parentElement.children[2];
    saveButton.style.display = "inline"

    const editInput = e.target.parentElement.parentElement.firstChild.children[2]
    editInput.style.display ="inline"
    editInput.style.padding ="3px"
    editInput.style.fontFamily="'Nanum Pen Script', cursive"

    const oldInput = e.target.parentElement.parentElement.firstChild.children[1]
    oldInput.style.display ="none"
        todo.classList.add("-edited");
}

const addHTML = (todo) => {
    const todoDiv = document.createElement("div");
    // todoDiv.setAttribute("id", "todo_deleteanimation")
    todoDiv.classList.add("todo");
    

    const todoLeft = document.createElement("div");
    todoLeft.classList.add("todo_left");

    const editInput = document.createElement("input");
    editInput.classList.add("todo_editInput")
    editInput.defaultValue = todo.text;
    editInput.style.marginLeft ="5px"
    editInput.style.display ="none"

    const todoCb = document.createElement("input");
    todoCb.type = "checkbox";
    todoCb.checked = todo.isCompleted;
    todoCb.classList.add("todo_cb");
    todoCb.addEventListener("click", completeTodo); // direkt olustururken veriyoruz event listenerlari

    const todoText = document.createElement("span");
    todoText.classList.add("todo_text");
    todoText.textContent = todo.text;

    todoLeft.appendChild(todoCb);
    todoLeft.appendChild(todoText);
    todoLeft.appendChild(editInput);

    const todoRight = document.createElement("div");
    todoRight.classList.add("todo_right");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo_deletebtn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteTodo); // direkt olustururken veriyoruz event listenerlari

    const editBtn = document.createElement("button");
    editBtn.classList.add("todo_editbtn");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", editTodo); // direkt olustururken veriyoruz event listenerlari

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("todo_savebtn");
    saveBtn.textContent = "Save";
    saveBtn.style.display = "none"
    saveBtn.addEventListener("click", saveTodo);

    todoRight.appendChild(deleteBtn);
    todoRight.appendChild(editBtn);
    todoRight.appendChild(saveBtn);

    todoDiv.appendChild(todoLeft);
    todoDiv.appendChild(todoRight);

    todo_container.appendChild(todoDiv);

    

   

}



startConf();

form.addEventListener("submit", addTodo);