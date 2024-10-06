// Variables del documento

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Añadir tarea
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Porfavor escriba una tarea.");
        return;
    }

    // Solo agregar <hr> si no es el primer elemento, además lo agrega arriba del <li> para que
    // ni el primer ni último <li> tengan <hr>, solo los que se encuentren en medio
    if (taskList.children.length > 0) {
        const hr = document.createElement('hr');
        taskList.appendChild(hr);
    }

    const newTask = document.createElement('li');

    // Agregar checkbox a la etiqueta label
    /*
        La razón de esto es debido a que adapte un framwork de CSS que me gusta
        a este proyecto, entonces quisé utilizar el checkbox que tiene y se realiza
        con la estructura que se encentra en el index. Por esta misma razón es que
        tiene una estructura extraña el JS, para guardar las estructuras del framework
        y sus clases respectivas
    */

    const label = document.createElement('label');
    label.classList.add('aesthetic-windows-95-checkbox');
    label.innerHTML = `${taskText}
        <input type="checkbox" />
        <span class="aesthetic-windows-95-checkmark"></span>`;

    newTask.appendChild(label);

    // Crear botón para eliminar tarea
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

    // Guardar y reiniciar el cuadro de texto
    saveTasks();
    taskInput.value = "";
}

// Función para marcar como completado. Le agrega o quita la clase "completed" al <li>.
// Debido a que el checkbox se encuentra dentro del mismo, este siempre sera el más cercano.
function toggleTask(event) {
    const taskItem = event.target.closest('li');
    taskItem.classList.toggle('completed', event.target.checked);
    saveTasks();
}

// Añadir evento al botón para agregar la tarea
addTaskBtn.addEventListener('click', addTask);

// Función para borrar elemento
function deleteTask(event) {

    const taskItem = event.target.closest('li');
    const hr = taskItem.previousElementSibling;
    
   // Elimina el <li> y el <hr> que tenga previo al <li>.
    taskItem.remove();
    if (hr && hr.tagName === 'HR') {
        hr.remove();
    }
    saveTasks();
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
    document.querySelectorAll('#taskList li').forEach(task => {
        const text = task.querySelector('label').textContent.trim();
        const completed = task.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text, completed });
    });
    console.log("Guardando tareas: ", tasks); // Depuración
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newTask = document.createElement('li');

        // Si la tarea está completada, añade la clase "completed"
        if (task.completed) {
            newTask.classList.add('completed');
        }

        const label = document.createElement('label');
        label.classList.add('aesthetic-windows-95-checkbox');
        label.innerHTML = `${task.text}
            <input type="checkbox" ${task.completed ? 'checked' : ''} />
            <span class="aesthetic-windows-95-checkmark"></span>`;

        newTask.appendChild(label);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('aesthetic-windows-95-button-title-bar', 'delete-btn');
        deleteButton.innerHTML = '<img src="msg_error-0.png" alt="eliminar">';
        deleteButton.addEventListener('click', deleteTask);
        newTask.appendChild(deleteButton);

        // Añadir la tarea al <ul>
        taskList.appendChild(newTask);

        // Añadir el <hr> si no es el último elemento
        if (task !== tasks[tasks.length - 1]) {
            const hr = document.createElement('hr');
            taskList.appendChild(hr);
        }

        // Añadir evento al checkbox para marcar como completado
        const checkbox = label.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', toggleTask);
    });
}

// Cargar tareas al cargar la página
window.addEventListener('DOMContentLoaded', loadTasks);