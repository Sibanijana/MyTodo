document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task)); // Fixed variable name
    updateTasksList();
    updateStats();
  }
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTasksList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed; // Fixed incorrect property access
  updateTasksList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks ? (completeTasks / totalTasks) * 100 : 0; // Ensure no division by zero
  const progressBar = document.getElementById("progress");

  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completeTasks} / ${totalTasks}`;

  if (totalTasks && completeTasks === totalTasks) {
    blastConfetti(); // Fixed typo
  }
};

const updateTasksList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Fixed typo

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <div class="taskItem">
          <div class="task ${task.completed ? "completed" : ""}">
             <input type="checkbox" class="checkbox" ${
               task.completed ? "checked" : ""
             } />
             <p>${task.text}</p>
          </div>
          <div class="icons">
            <img src="./img/edit.png" onclick="editTask(${index})" />+
            <img src="./img/bin.png" onclick="deleteTask(${index})" />
          </div>
        </div>
        `;

    listItem
      .querySelector(".checkbox")
      .addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault(); // Fixed missing parentheses
  addTask();
});

const blastConfetti = () => {
  var duration = 2 * 1000; // 2 seconds
  var end = Date.now() + duration;

  // Frame confetti animation
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
