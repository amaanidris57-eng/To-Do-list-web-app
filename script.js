const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");
const counter = document.getElementById("counter");

// State: array of { id, text, completed }
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
taskList.innerHTML = "";

tasks.forEach(task => {
const li = document.createElement("li");
if (task.completed) li.classList.add("completed");

const span = document.createElement("span");
span.className = "task-text";
span.textContent = task.text;
span.addEventListener("click", () => toggleTask(task.id));

const removeBtn = document.createElement("button");
removeBtn.className = "remove-btn";
removeBtn.textContent = "Remove";
removeBtn.addEventListener("click", () => removeTask(task.id));

li.append(span, removeBtn);
taskList.appendChild(li);
});

const done = tasks.filter(t => t.completed).length;
counter.textContent = tasks.length ? `${done} of ${tasks.length} completed` : "";
emptyMsg.classList.toggle("hidden", tasks.length > 0);
}

function addTask() {
const text = taskInput.value.trim();
if (!text) {
taskInput.focus();
return;
}
tasks.push({ id: Date.now(), text, completed: false });
taskInput.value = "";
taskInput.focus();
save();
render();
}

function toggleTask(id) {
const task = tasks.find(t => t.id === id);
if (task) task.completed = !task.completed;
save();
render();
}

function removeTask(id) {
tasks = tasks.filter(t => t.id !== id);
save();
render();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => {
if (e.key === "Enter") addTask();
});

render();
