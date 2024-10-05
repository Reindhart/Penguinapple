// Obtener elementos del DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Función para agregar una nueva tarea
function addTask() {
    const taskText = taskInput.value.trim(); // Obtener y limpiar el valor del input
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Crear un nuevo elemento 'li'
    const newTask = document.createElement('li');

    // Crear checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleTask); // Añadir evento para marcar como completado

    // Crear texto para la tarea
    const taskLabel = document.createElement('span');
    taskLabel.textContent = taskText;

    // Añadir checkbox y texto a la tarea
    newTask.appendChild(checkbox);
    newTask.appendChild(taskLabel);

    // Añadir la tarea a la lista
    taskList.appendChild(newTask);

    // Limpiar el input
    taskInput.value = "";
}

// Función para marcar como completado
function toggleTask(event) {
    const taskItem = event.target.parentNode;
    if (event.target.checked) {
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
    }
}

// Añadir evento al botón para agregar la tarea
addTaskBtn.addEventListener('click', addTask);

// Añadir la tarea al presionar 'Enter'
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
