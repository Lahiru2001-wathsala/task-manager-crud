let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks(filteredTasks = tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-header">
        <span class="${task.completed ? 'completed' : ''}">
          ${task.text}
        </span>
        <div>
          <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleComplete(${index})">
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      </div>
      <div class="task-time">
        ${task.date}
      </div>
    `;

    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* CREATE */
function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value === "") return;

  const task = {
    text: input.value,
    completed: false,
    date: new Date().toLocaleString()
  };

  tasks.push(task);
  input.value = "";
  displayTasks();
}

/* UPDATE */
function editTask(index) {
  const newText = prompt("Edit task", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText;
    displayTasks();
  }
}

/* DELETE */
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

/* COMPLETED STATUS */
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

/* SEARCH */
function searchTasks() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const filtered = tasks.filter(task =>
    task.text.toLowerCase().includes(searchValue)
  );
  displayTasks(filtered);
}

/* READ */
displayTasks();
