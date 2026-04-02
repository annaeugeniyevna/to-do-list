const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const renderTasks = () => {
    taskList.innerHTML = "";

    savedTasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.done) span.classList.add("done");

        span.addEventListener("click", () => {
            savedTasks[index].done = !savedTasks[index].done;
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.addEventListener("click", () => {
            savedTasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
};

addBtn.addEventListener("click", () => {
    const text = taskInput.value;
    if (text === "") return;

    savedTasks.push({ text: text, done: false});
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    taskInput.value = "";
    renderTasks();
});

renderTasks();

















