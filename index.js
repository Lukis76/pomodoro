const tasks = [];
let time = 0;
let timer = null;
let timeBreak = null;
let current = null;

const bAdd = document.querySelector("#b_add");
const inputTask = document.querySelector("#input_task");
const from = document.querySelector("#from");
const taskName = document.querySelector("#time #taskName");


from.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputTask.value !== "") {
    createTask(inputTask.value);
    inputTask.value = "";
    renderTask();
  }
});

const createTask = (value) => {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3), //id dinamico
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
};

const renderTask = () => {
  const html = tasks.map((task) => {
    return `
    <div class="task">
    <div class="completed">
    ${
      task.completed
      ? `<span class="done" >Done</span>`
      : `<button class="start_button" data-id="${task.id}" >Start</button>`
    }
    </div>
    <div class="title">${task.title}</div>
    </div>
    `;
  });

  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".task .start_button");
  startButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!timer) {
        const id = button.getAttribute("data-id");
        startButtonHandler(id);
        button.textContent = "In progress...";
      }
    });
  });
};

const startButtonHandler = (id) => {
  time = 5; //25 * 60
  current = id;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  const taskName = document.querySelector("#time #taskName");
  taskName.textContent = tasks[taskIndex].title;
  timer = setInterval(() => {
    timeHandler(id);
  }, 1000);
};

const timeHandler = (id) => {
  time--;
  renderTime();
  
  if (time === 0) {
    // current = null
    // taskName.textContent = ''
    clearInterval(timer);
    markComplited(id);
    timer = null
    renderTask();
    startBreak();
  }
};

const markComplited = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].completed = true;
};

const startBreak = () => {
  time = 3; //5 * 60
  const taskName = document.querySelector("#time #taskName");
  taskName.textContent = "Break";
  timeBreak = setInterval(() => {
    timeHandlerBreak();
  }, 1000);
};

const timeHandlerBreak = () => {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timeBreak);
    current = null;
    timeBreak = null
    const taskName = document.querySelector("#time #taskName");
    taskName.textContent = "";
    // renderTask()
    renderTask();
  }
};

const renderTime = () => {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);
  
  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

renderTime();
renderTask();