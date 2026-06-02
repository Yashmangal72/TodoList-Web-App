const add = document.getElementById("add");
const clear = document.getElementById("clear");
const mode = document.getElementById("mode");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let tasks = [];

const savedTasks = JSON.parse(
    localStorage.getItem("tasks")
);
if(savedTasks){
    tasks = savedTasks;
}

tasks.forEach(function(task){
    createTask(task);
});
function createTask(task){ 

const li = document.createElement("li");

const taskText = document.createElement("span");
taskText.textContent = task.text;

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";

const doneBtn = document.createElement("button");
doneBtn.textContent = "Done ✓";

if(task.completed){
    taskText.style.textDecoration = "line-through";
    doneBtn.textContent = "Undo ↺";
    li.style.opacity = "0.6";
    doneBtn.classList.add("doneBtn");
}

li.appendChild(taskText);
li.appendChild(deleteBtn);
li.appendChild(doneBtn);

taskList.appendChild(li);
   
    
    deleteBtn.addEventListener("click", function(){
        tasks = tasks.filter(function(t){
        return t !== task;
    });
    

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    li.remove();
});

    doneBtn.addEventListener("click", function(){
    task.completed = !task.completed;

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    doneBtn.classList.toggle("doneBtn");

    if(doneBtn.classList.contains("doneBtn")){
        taskText.style.textDecoration = "line-through";
        doneBtn.textContent = "Undo ↺";
        li.style.opacity = "0.6";
    }
    else {
        taskText.style.textDecoration = "none";
        doneBtn.textContent = "Done ✓";
        li.style.opacity = "1";
    }
});
}

add.addEventListener("click", function(){
const task = taskInput.value.trim();
if(task === ""){
        return;
    }
const newTask = {
    text: task,
    completed: false
};

tasks.push(newTask);

localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
);

createTask(newTask);

taskInput.value = "";
});


mode.addEventListener ("click", function(){
    document.body.classList.toggle("mode");
    if(document.body.classList.contains("mode")){
        mode.textContent = "☀️ Light Mode";
    }
    else {
        mode.textContent = "🌙 Dark Mode";
    }
});


clear.addEventListener("click", function(){
    tasks = [];
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
    taskList.innerHTML = "";
})



taskInput.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        add.click();
    }
});