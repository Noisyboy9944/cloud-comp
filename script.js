// Get references to the HTML elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const taskCounter = document.getElementById('task-counter');
const clearAllBtn = document.getElementById('clear-all-btn');

// NEW: Get references to the modal elements
const confirmModalOverlay = document.getElementById('confirm-modal-overlay');
const confirmModal = document.getElementById('confirm-modal');
const modalBtnYes = document.getElementById('modal-btn-yes');
const modalBtnNo = document.getElementById('modal-btn-no');

// --- Function to update the pending task counter ---
function updateCounter() {
    const pendingTasks = document.querySelectorAll('.task-item:not(.completed)').length;
    taskCounter.textContent = pendingTasks;
}

// --- Function to add a new task ---
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.className = 'task-item';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        li.classList.toggle('completed');
        updateCounter();
    });

    const label = document.createElement('label');
    label.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li);
        updateCounter();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';
    updateCounter();
}

// --- NEW: Functions to control the modal ---
function showModal() {
    confirmModalOverlay.style.display = 'block';
    confirmModal.style.display = 'block';
}

function hideModal() {
    confirmModalOverlay.style.display = 'none';
    confirmModal.style.display = 'none';
}

// Event listener for the "Clear All" button - now it just shows the modal
clearAllBtn.addEventListener('click', showModal);

// Event listener for the "No" button in the modal
modalBtnNo.addEventListener('click', hideModal);

// Event listener for the "Yes" button in the modal
modalBtnYes.addEventListener('click', function() {
    taskList.innerHTML = ''; // Clear the tasks
    updateCounter();         // Update the counter
    hideModal();             // Hide the modal after action
});

// Event listener for adding a task with the "Add" button
addTaskBtn.addEventListener('click', addTask);

// Event listener for adding a task by pressing "Enter"
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initialize the counter on page load
updateCounter();