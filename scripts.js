// Função para carregar tarefas do localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(item => {
        tasks.push({
            text: item.firstChild.textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para adicionar tarefa ao DOM e ao localStorage
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTaskToDOM(taskText);
        saveTasks();
        taskInput.value = '';
    }
}

// Função para adicionar tarefa ao DOM
function addTaskToDOM(taskText, completed = false) {
    const taskList = document.getElementById('task-list');

    const listItem = document.createElement('li');
    if (completed) {
        listItem.classList.add('completed');
    }
    listItem.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.onclick = function () {
        taskList.removeChild(listItem);
        saveTasks();
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = function () {
        const newTaskText = prompt('Editar tarefa:', taskText);
        if (newTaskText) {
            listItem.firstChild.textContent = newTaskText;
            saveTasks();
        }
    };

    listItem.addEventListener('click', function (event) {
        if (event.target.tagName !== 'BUTTON') {
            listItem.classList.toggle('completed');
            saveTasks();
        }
    });

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

// Função para filtrar as tarefas
function filterTasks(filter) {
    const tasks = document.querySelectorAll('#task-list li');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = '';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? '' : 'none';
                break;
            case 'uncompleted':
                task.style.display = task.classList.contains('completed') ? 'none' : '';
                break;
        }
    });
}

// Carrega as tarefas ao iniciar
window.onload = function () {
    loadTasks();
};
