// Open Employee Login Modal
function openEmployeeLogin() {
    document.getElementById("employeeLoginModal").style.display = "flex";
  }
  
  // Close Employee Login Modal
  function closeEmployeeLogin() {
    document.getElementById("employeeLoginModal").style.display = "none";
  }
  
  // Open Employee Signup Modal
  function openEmployeeSignup() {
    closeEmployeeLogin();
    document.getElementById("employeeSignupModal").style.display = "flex";
  }
  
  // Close Employee Signup Modal
  function closeEmployeeSignup() {
    document.getElementById("employeeSignupModal").style.display = "none";
  }
  
  // Open Admin Login Modal
  function openAdminLogin() {
    document.getElementById("adminLoginModal").style.display = "flex";
  }
  
  // Close Admin Login Modal
  function closeAdminLogin() {
    document.getElementById("adminLoginModal").style.display = "none";
  }
  
  // Close modals on outside click
  window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      closeEmployeeLogin();
      closeEmployeeSignup();
      closeAdminLogin();
    }
  };
// Save Employee Signup Info
function saveEmployeeSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signupName').value;
  const fatherName = document.getElementById('signupFatherName').value;
  const empID = document.getElementById('signupID').value;
  const password = document.getElementById('signupPassword').value;

  // Save to localStorage with tasks and deadlines
  localStorage.setItem(empID, JSON.stringify({
      name,
      fatherName,
      empID,
      password,
      tasks: [], // Initialize tasks as empty
      deadline: '', // Initialize deadline as empty
      completedTasks: [] // Initialize completed tasks as an empty array
  }));
  alert('Employee registered successfully!');
  closeEmployeeSignup();
}
  
// Validate Admin Login
function validateAdminLogin(event) {
  event.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;

  const adminData = localStorage.getItem(email);
  if (adminData) {
      const admin = JSON.parse(adminData);
      if (admin.password === password) {
          alert('Admin login successful!');
          window.location.href = 'admin-dashboard.html'; // Redirect to the admin dashboard
      } else {
          alert('Incorrect password.');
      }
  } else {
      alert('Admin not registered.');
  }
}
  
  // Modal control functions remain the same
  function openEmployeeLogin() {
    document.getElementById("employeeLoginModal").style.display = "flex";
  }
  
  function closeEmployeeLogin() {
    document.getElementById("employeeLoginModal").style.display = "none";
  }
  
  function openEmployeeSignup() {
    closeEmployeeLogin();
    document.getElementById("employeeSignupModal").style.display = "flex";
  }
  
  function closeEmployeeSignup() {
    document.getElementById("employeeSignupModal").style.display = "none";
  }
// Save Employee Signup Info
function saveEmployeeSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signupName').value;
  const fatherName = document.getElementById('signupFatherName').value;
  const empID = document.getElementById('signupID').value;
  const password = document.getElementById('signupPassword').value;

  const employeeList = JSON.parse(localStorage.getItem('employeeList')) || [];
  const exists = employeeList.some(emp => emp.empID === empID);

  if (exists) {
      alert('Employee ID already exists.');
      return;
  }

  const newEmployee = {
      name,
      fatherName,
      empID,
      password,
      tasks: [
          
      ],
      completedTasks: []
  };

  localStorage.setItem(empID, JSON.stringify(newEmployee));
  employeeList.push(newEmployee);
  localStorage.setItem('employeeList', JSON.stringify(employeeList));
  alert('Employee registered successfully!');
  closeEmployeeSignup();
}


  
// Save Admin Signup Info
function saveAdminSignup(event) {
  event.preventDefault();
  const name = document.getElementById('adminName').value;
  const designation = document.getElementById('adminDesignation').value;
  const email = document.getElementById('adminSignupEmail').value;
  const password = document.getElementById('adminSignupPassword').value;

  // Save to localStorage
  localStorage.setItem(email, JSON.stringify({
      name,
      designation,
      email,
      password
  }));
  alert('Admin registered successfully!');
  closeAdminSignup();
}
  
function validateEmployeeLogin(event) {
  event.preventDefault();
  const empID = document.getElementById('empID').value;
  const password = document.getElementById('empPassword').value;

  const employeeData = localStorage.getItem(empID);
  const employeeList = JSON.parse(localStorage.getItem('employeeList')) || [];

  if (employeeData) {
    const employee = JSON.parse(employeeData);
    // Check if the entered name matches any in the employee list
    const nameMatch = employeeList.find(emp => emp.name === employee.name);
    
    if (nameMatch) {
      if (employee.password === password) {
        localStorage.setItem('loggedInEmployeeID', empID); // Store logged-in employee ID
        alert('Login successful!');
        window.location.href = 'employee-tasks.html'; // Redirect to the employee tasks page
      } else {
        alert('Incorrect password.');
      }
    } else {
      alert('Name does not match with the employee list.');
    }
  } else {
    alert('Employee not registered.');
  }
}

  function login(event) {
    event.preventDefault();
    const employeeID = parseInt(document.getElementById('empID').value, 10);
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = employees.find(emp => emp.id === employeeID);
    
    if (employee) {
        // Store logged-in employee ID in localStorage
        localStorage.setItem('loggedInEmployeeID', employeeID);
        // Redirect to the employee tasks page
        window.location.href = 'employee-tasks.html';
    } else {
        alert('Invalid Employee ID.');
    }
}
  
  // Modal control functions
  function openEmployeeLogin() {
    document.getElementById("employeeLoginModal").style.display = "flex";
  }
  
  function closeEmployeeLogin() {
    document.getElementById("employeeLoginModal").style.display = "none";
  }
  
  function openEmployeeSignup() {
    closeEmployeeLogin();
    document.getElementById("employeeSignupModal").style.display = "flex";
  }
  
  function closeEmployeeSignup() {
    document.getElementById("employeeSignupModal").style.display = "none";
  }
  
  function openAdminLogin() {
    document.getElementById("adminLoginModal").style.display = "flex";
  }
  
  function closeAdminLogin() {
    document.getElementById("adminLoginModal").style.display = "none";
  }
  
  function openAdminSignup() {
    closeAdminLogin();
    document.getElementById("adminSignupModal").style.display = "flex";
  }
  
  function closeAdminSignup() {
    document.getElementById("adminSignupModal").style.display = "none";
  }
 
 //.......................................





 