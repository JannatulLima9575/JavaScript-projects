// Selecting Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from Local Storage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task
addTaskBtn.addEventListener("click", function() {
    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskInput.value);
    saveTask(taskInput.value);
    taskInput.value = "";
});

// Create Task Element
function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="complete-btn">✔</button>
        <button class="delete-btn">❌</button>
    `;

    // Complete Task
    li.querySelector(".complete-btn").addEventListener("click", function() {
        li.classList.toggle("completed");
    });

    // Delete Task
    li.querySelector(".delete-btn").addEventListener("click", function() {
        li.remove();
        deleteTask(taskText);
    });

    taskList.appendChild(li);
}

// Save Task to Local Storage
function saveTask(task) {
    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks.forEach(task => createTaskElement(task));
}

// Delete Task from Local Storage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}