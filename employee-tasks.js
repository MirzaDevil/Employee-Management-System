// Function to generate random tasks and deadlines
function generateRandomTasks() {
    const tasks = [
        "Complete project report",
    
        
    ];

    const deadlines = [
    
        "2024-11-22",
       
    ];

    const assignedTasks = [];
    const taskCount = Math.floor(Math.random() * 2) ; // Assign 2-4 tasks randomly

    for (let i = 0; i < taskCount; i++) {
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        const deadline = deadlines[Math.floor(Math.random() * deadlines.length)];
        assignedTasks.push({ task, deadline, completed: false });
    }

    return assignedTasks;
}

// Function to load employee tasks on employee-tasks.html
function loadEmployeeTasks() {
    const empID = localStorage.getItem('loggedInEmployeeID');
    if (!empID) {
        alert("Please log in first.");
        window.location.href = 'index.html';
        return;
    }

    const employeeData = JSON.parse(localStorage.getItem(empID));
    const taskListElement = document.getElementById('taskList');
    const employeeNameElement = document.getElementById('employeeName');
    
    employeeNameElement.textContent = employeeData.name;

    // Generate random tasks if not already assigned
    if (!employeeData.tasks || employeeData.tasks.length === 0) {
        employeeData.tasks = generateRandomTasks();
        localStorage.setItem(empID, JSON.stringify(employeeData));
    }

    taskListElement.innerHTML = '';

    employeeData.tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';

        const taskInfo = document.createElement('p');
        taskInfo.textContent = `Task: ${task.task} | Deadline: ${task.deadline}`;

        const statusButton = document.createElement('button');
        statusButton.textContent = task.completed ? 'Completed' : 'Not Completed';
        statusButton.style.backgroundColor = task.completed ? 'green' : 'red';
        statusButton.onclick = () => toggleTaskCompletion(empID, index, statusButton);

        taskDiv.appendChild(taskInfo);
        taskDiv.appendChild(statusButton);
        taskListElement.appendChild(taskDiv);
    });
}

// Function to toggle task completion status
function toggleTaskCompletion(empID, taskIndex, button) {
    const employeeData = JSON.parse(localStorage.getItem(empID));

    // Toggle task completion status
    employeeData.tasks[taskIndex].completed = !employeeData.tasks[taskIndex].completed;
    localStorage.setItem(empID, JSON.stringify(employeeData));

    // Update button text and color
    if (employeeData.tasks[taskIndex].completed) {
        button.textContent = 'Completed';
        button.style.backgroundColor = 'green';
    } else {
        button.textContent = 'Not Completed';
        button.style.backgroundColor = 'red';
    }
}

// Function to logout
function logout() {
    localStorage.removeItem('loggedInEmployeeID');
    window.location.href = 'index.html';
}

// Ensure the tasks are loaded on page load
window.onload = loadEmployeeTasks;
