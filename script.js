const STORAGE_KEY = "summer_homework_tasks";
const tasks = [
  { name: "数学の問題集", due: "8/15", status: "not-started" },
  { name: "自由研究", due: "8/20", status: "not-started" },
  { name: "読書感想文", due: "8/25", status: "not-started" },
];

// 保存
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// 読み込み
function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        for (const t of parsed) {
          if (!("name" in t && "due" in t && "status" in t)) return;
        }
        tasks.splice(0, tasks.length, ...parsed);
      }
    } catch {}
  }
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    const nameEl = document.createElement("div");
    nameEl.textContent = task.name;
    const dueEl = document.createElement("div");
    dueEl.textContent = "締め切り: " + task.due;
    dueEl.className = "task-due";
    info.appendChild(nameEl);
    info.appendChild(dueEl);

    const box = document.createElement("div");
    box.className = "checkbox" + (task.status === "completed" ? " completed" : "");
    box.onclick = () => {
      task.status = task.status === "completed" ? "not-started" : "completed";
      saveTasks();
      renderTasks();
    };

    li.appendChild(info);
    li.appendChild(box);
    taskList.appendChild(li);
  });
}

document.getElementById("toggle-mode").onclick = () => {
  document.body.classList.toggle("dark");
};

loadTasks();
renderTasks();