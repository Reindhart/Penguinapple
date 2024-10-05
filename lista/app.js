// Obtener elementos del DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Función para agregar una nueva tarea
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Solo agregar <hr> si no es el primer elemento
    if (taskList.children.length > 0) {
        const hr = document.createElement('hr');
        taskList.appendChild(hr);
    }

    const newTask = document.createElement('li');

    // Crear label con checkbox
    const label = document.createElement('label');
    label.classList.add('aesthetic-windows-95-checkbox');
    label.innerHTML = `${taskText}
        <input type="checkbox" />
        <span class="aesthetic-windows-95-checkmark"></span>`;

    newTask.appendChild(label);

    // Crear botón para eliminar tarea con formato específico
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('aesthetic-windows-95-button-title-bar', 'delete-btn');
    deleteButton.innerHTML = '<img src="msg_error-0.png" alt="eliminar">';
    deleteButton.addEventListener('click', deleteTask);
    newTask.appendChild(deleteButton);

    // Añadir la tarea a la lista
    taskList.appendChild(newTask);

    

    // Añadir evento al checkbox
    const checkbox = label.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', toggleTask);

    saveTasks(); // Guardar tareas en local storage
    taskInput.value = "";
}

// Función para marcar como completado
function toggleTask(event) {
    const taskItem = event.target.closest('li');
    taskItem.classList.toggle('completed', event.target.checked);
    saveTasks(); // Actualizar local storage
}
// Añadir evento al botón para agregar la tarea
addTaskBtn.addEventListener('click', addTask);

// Función para borrar elemento
function deleteTask(event) {
    const taskItem = event.target.closest('li'); // Obtener el elemento 'li' más cercano
    const hr = taskItem.previousElementSibling; // Obtener el siguiente elemento, que debería ser el <hr>
    
    taskItem.remove(); // Eliminar el <li>
    if (hr && hr.tagName === 'HR') { // Verificar si el siguiente elemento es un <hr>
        hr.remove(); // Eliminar el <hr>
    }

    saveTasks(); // Actualizar local storage
}

// Añadir la tarea al presionar 'Enter'
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});



// Función para guardar las tareas en local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(task => {
        const text = task.querySelector('label').textContent.trim();
        const completed = task.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newTask = document.createElement('li');

        const label = document.createElement('label');
        label.classList.add('aesthetic-windows-95-checkbox');
        label.innerHTML = `${task.text}
            <input type="checkbox" ${task.completed ? 'checked' : ''} />
            <span class="aesthetic-windows-95-checkmark"></span>`;

        newTask.appendChild(label);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', deleteTask);
        newTask.appendChild(deleteButton);

        taskList.appendChild(newTask);

        // Añadir evento al checkbox
        const checkbox = label.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', toggleTask);
    });
}

// Cargar tareas al cargar la página
window.addEventListener('DOMContentLoaded', loadTasks);