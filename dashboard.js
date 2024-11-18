// Function to show the dashboard and display employee statistics
function showDashboard() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Calculate total employees
    const totalEmployees = employees.length;

    // Calculate tasks completed and active tasks
    let tasksCompleted = 0;
    let activeTasks = 0;
    employees.forEach(employee => {
        const totalTasksForEmployee = employee.tasks.length;
        const completedTasksForEmployee = employee.completedTasks ? employee.completedTasks.length : 0;

        tasksCompleted += completedTasksForEmployee;
        activeTasks += (totalTasksForEmployee - completedTasksForEmployee);
    });

    // Calculate remaining tasks
    const remainingTasks = activeTasks;

    // Update the dashboard content in HTML
    document.getElementById('totalEmployees').textContent = totalEmployees;
    document.getElementById('tasksCompleted').textContent = tasksCompleted;
    document.getElementById('activeTasks').textContent = activeTasks;
    document.getElementById('remainingTasks').textContent = remainingTasks;

    // Show the dashboard content and hide other sections
    document.getElementById('dashboardContent').style.display = 'block';
    document.getElementById('employeeListContent').style.display = 'none';
    document.getElementById('addEmployeeContent').style.display = 'none';
}





// Function to show the employee list
function showEmployeeList() {
    displayEmployeeList(); // Call function to display employee list
    document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('employeeListContent').style.display = 'block';
    document.getElementById('addEmployeeContent').style.display = 'none';
}
// Function to show the add employee form
function showAddEmployeeForm() {
    document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('employeeListContent').style.display = 'none';
    document.getElementById('addEmployeeContent').style.display = 'block';
    document.getElementById('newEmployeeForm').reset(); // Reset form fields
}


// Function to display the employee list
function displayEmployeeList() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employeeTableBody = document.querySelector('#employeeTable tbody');
    employeeTableBody.innerHTML = ''; // Clear any previous entries

    if (employees.length === 0) {
        employeeTableBody.innerHTML = '<tr><td colspan="7">No employees found.</td></tr>';
    } else {
        employees.forEach((emp, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${emp.name}</td>
                <td>${emp.id}</td>
                <td>${emp.role}</td>
                <td>${emp.department}</td>
                <td>${emp.tasks.join(', ')}</td>
                <td>${emp.deadline}</td>
                <td>${emp.completedTasks && emp.completedTasks.length === emp.tasks.length ? 'Yes' : 'No'}</td>
                <td>
                    <button onclick="editEmployee(${index})">Edit</button>
                    <button onclick="deleteEmployee(${index})">Delete</button>
                    <button onclick="markTaskCompleted(${index})" style="background-color: ${emp.completedTasks && emp.completedTasks.length === emp.tasks.length ? 'green' : ''}; color: ${emp.completedTasks && emp.completedTasks.length === emp.tasks.length ? 'white' : ''};">
                        ${emp.completedTasks && emp.completedTasks.length === emp.tasks.length ? 'Completed' : 'Mark as Completed'}
                    </button>
                </td>
            `;
            employeeTableBody.appendChild(row);
        });
    }
}

// Function to mark a task as completed
function markTaskCompleted(index) {
    const employees = JSON.parse(localStorage.getItem('employees'));
    
    // Check if the employee's tasks are already marked as completed
    if (!employees[index].completedTasks || employees[index].completedTasks.length !== employees[index].tasks.length) {
        // Set all tasks as completed by marking each task in the completedTasks array
        employees[index].completedTasks = [...employees[index].tasks]; // Assume all tasks are completed
        localStorage.setItem('employees', JSON.stringify(employees)); // Save updated data to localStorage

        // Update the employee list and task statistics
        displayEmployeeList(); 
        updateTaskStatistics(); 

        // Update the Employee Dashboard
        updateEmployeeDashboard(employees[index].id);
    }
}


// Function to delete an employee
function deleteEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees'));
    employees.splice(index, 1); // Remove employee from the array
    localStorage.setItem('employees', JSON.stringify(employees));
    alert('Employee deleted successfully!');
    displayEmployeeList(); // Refresh the employee list
    updateTaskStatistics(); // Update the task statistics
}

// Function to add a new employee
function addEmployee(event) {
    event.preventDefault();
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const newEmployee = {
        id: document.getElementById('empID').value,
        name: document.getElementById('empName').value,
        role: document.getElementById('empRole').value,
        department: document.getElementById('empDepartment').value,
        salary: document.getElementById('empSalary').value,
        tasks: document.getElementById('empTasks').value.split(','), // Store tasks as an array
        deadline: document.getElementById('empDeadline').value,
        completedTasks: [] // Initialize completed tasks as an empty array
    };
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
    alert('Employee added successfully!');
    showEmployeeList();
}




// Function to edit an employee
function editEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const emp = employees[index];

    document.getElementById('editEmpID').value = index;
    document.getElementById('editEmpName').value = emp.name;
    document.getElementById('editEmpRole').value = emp.role;
    document.getElementById('editEmpDepartment').value = emp.department;
    document.getElementById('editEmpSalary').value = emp.salary;
    document.getElementById('editEmpTasks').value = emp.tasks;
    document.getElementById('editEmpDeadline').value = emp.deadline;

    document.getElementById('editEmployeeModal').style.display = 'block';
}
// Function to update an employee
function updateEmployee(event) {
    event.preventDefault(); // Prevent form submission
    const index = document.getElementById('editEmpID').value;
    const employees = JSON.parse(localStorage.getItem('employees'));

    employees[index] = {
        id: employees[index].id,
        name: document.getElementById('editEmpName').value,
        role: document.getElementById('editEmpRole').value,
        department: document.getElementById('editEmpDepartment').value,
        salary: document.getElementById('editEmpSalary').value,
        tasks: document.getElementById('editEmpTasks').value,
        deadline: document.getElementById('editEmpDeadline').value,
        completed: employees[index].completed
    };

    localStorage.setItem('employees', JSON.stringify(employees));
    alert('Employee updated successfully!');
    closeEditModal();
    showEmployeeList(); // Refresh the employee list
}
// Function to close the edit modal
function closeEditModal() {
    document.getElementById('editEmployeeModal').style.display = 'none';
}

// Other functions (addEmployee, editEmployee, updateEmployee, closeEditModal, logout) remain the same
// Function to log out and redirect to the home page
function logout() {
    // Clear any session data if necessary
    localStorage.removeItem('admin'); // Optionally clear admin session data
    alert('Logged out successfully!'); // Inform the user
    window.location.href = 'index.html'; // Redirect to the home page (update with your actual home page URL)
}

