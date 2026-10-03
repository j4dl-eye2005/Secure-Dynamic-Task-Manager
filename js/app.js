var taskInput = document.getElementById("taskInput");
var addTaskBtn = document.getElementById("addTaskBtn");
var loadSamplesBtn = document.getElementById("loadSamplesBtn");
var taskList = document.getElementById("taskList");
var taskMessage = document.getElementById("taskMessage");
var totalCount = document.getElementById("totalCount");
var pendingCount = document.getElementById("pendingCount");
var completedCount = document.getElementById("completedCount");

var taskCounter = 0;

function createTaskElement(taskText, taskId) {
  var li = document.createElement("li");
  li.className = "task-item";
  li.dataset.taskId = taskId;
  li.dataset.state = "pending";

  var span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;

  var completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.textContent = "Complete";

  var editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";

  var removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";

  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);

  return li;
}

function addTask(taskText) {
  if (taskText.trim() === "") {
    taskMessage.textContent = "Task cannot be empty";
    return;
  }

  taskCounter++;
  var taskId = "task-" + taskCounter;
  var newTask = createTaskElement(taskText.trim(), taskId);
  taskList.appendChild(newTask);

  taskInput.value = "";
  taskMessage.textContent = "";
  updateTaskCounts();
}

function toggleTaskComplete(taskItem) {
  taskItem.classList.toggle("completed");
  if (taskItem.classList.contains("completed")) {
    taskItem.dataset.state = "completed";
  } else {
    taskItem.dataset.state = "pending";
  }
  updateTaskCounts();
}

function beginTaskEdit(taskItem) {
  var span = taskItem.querySelector(".task-text");
  var editBtn = taskItem.querySelector(".edit-btn");

  var input = document.createElement("input");
  input.className = "edit-input";
  input.value = span.textContent;

  taskItem.replaceChild(input, span);
  editBtn.textContent = "Save";
}

function saveTaskEdit(taskItem) {
  var input = taskItem.querySelector(".edit-input");
  var editBtn = taskItem.querySelector(".edit-btn");

  if (input.value.trim() === "") {
    taskMessage.textContent = "Task cannot be empty";
    return;
  }

  var span = document.createElement("span");
  span.className = "task-text";
  span.textContent = input.value.trim();

  taskItem.replaceChild(span, input);
  editBtn.textContent = "Edit";
  taskMessage.textContent = "";
}

function removeTask(taskItem) {
  taskItem.remove();
  updateTaskCounts();
}

function updateTaskCounts() {
  var items = taskList.querySelectorAll(".task-item");
  var total = items.length;
  var completed = 0;
  var pending = 0;

  for (var i = 0; i < items.length; i++) {
    if (items[i].dataset.state === "completed") {
      completed++;
    } else {
      pending++;
    }
  }

  totalCount.textContent = total;
  pendingCount.textContent = pending;
  completedCount.textContent = completed;
}

function handleTaskListClick(event) {
  var target = event.target;
  var taskItem = target.closest(".task-item");
  if (!taskItem) {
    return;
  }

  if (target.classList.contains("complete-btn")) {
    toggleTaskComplete(taskItem);
  } else if (target.classList.contains("edit-btn")) {
    if (target.textContent === "Edit") {
      beginTaskEdit(taskItem);
    } else {
      saveTaskEdit(taskItem);
    }
  } else if (target.classList.contains("remove-btn")) {
    removeTask(taskItem);
  }
}

function loadSampleTasks() {
  var samples = ["Review DOM selectors", "Practice createElement", "Study event delegation"];
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < samples.length; i++) {
    taskCounter++;
    var taskId = "task-" + taskCounter;
    var task = createTaskElement(samples[i], taskId);
    fragment.appendChild(task);
  }

  taskList.appendChild(fragment);
  updateTaskCounts();
}

addTaskBtn.addEventListener("click", function () {
  addTask(taskInput.value);
});

loadSamplesBtn.addEventListener("click", function () {
  loadSampleTasks();
});

taskList.addEventListener("click", handleTaskListClick);

updateTaskCounts();
