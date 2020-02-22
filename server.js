const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: process.env.PORT || 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employee_trackerDB"
});

connection.connect(err  => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
});

// starter function
const inquire = () => inquirer.prompt([
  {
      type: "list",
      message: "What would you like to do? (Use Arrow Keys)",
      name: "choice",
      choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Exit"
      ]
  }
]).then(answer => {
  switch (answer.choice) {
      case "View All Employees":
        allEmployees();
        break;
      case "View All Departments":
        allDepartments();
        break;
      case "View All Roles":
        allRoles();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRole();
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      case "Exit":
        connection.end();
        break;
  }
});

// View All Employees
const allEmployees = () => {
  connection.query("SELECT employee.id, first_name AS firstname, last_name AS lastname, title AS role, name AS department, salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;", (err, res) => {
      if (err) throw err;
      console.table(res);
      inquire();
  })
};

// View All Departments
const allDepartments = () => {
  connection.query("SELECT id, name AS department FROM department", (err, res) => {
      if (err) throw err;
      console.table(res);
      inquire();
  })
};

// View All Roles
const allRoles = () => {
  connection.query("SELECT role.id, title AS role, salary, name AS department FROM role INNER JOIN department ON department_id = department.id", (err, res) => {
      if (err) throw err;
      console.table(res);
      inquire();
  })
};

// Add Employee
const addEmployee = () => inquirer.prompt([
  {
    type: "input",
    name: "employeeFirstName",
    message: "What is your employee's first name?",
    validate: function(answer) {
      if (answer != "") {
        return true;
      }
      return "Please enter at least one character";
    }
  },
  {
    type: "input",
    name: "employeeLastName",
    message: "What is your employee's last name?",
    validate: function(answer) {
      if (answer != "") {
        return true;
      }
      return "Please enter at least one character";
    }
  },
  {
    type: "input",
    name: "roleID",
    message: "What is your employee's role id?",
  },
  {
    type: "input",
    name: "managerID",
    message: "What is your employee's manager id?",
  },
]).then(answer => {
  connection.query(
    "INSERT INTO employee SET ?", 
      {
        first_name: answer.employeeFirstName,
        last_name: answer.employeeLastName, 
        role_id: answer.roleID, 
        manager_id: answer.managerID
      }, 
      function(err, res) {
    if (err) throw err;
    console.log(`You have entered ${answer.employeeFirstName} ${answer.employeeLastName} into your employee database.`)
    inquire();
  })
});

// Add Department
const addDepartment = () => inquirer.prompt([
  {
    type: "input",
    name: "deptName",
    message: "What department would you like to add?",
    validate: function(answer) {
      if (answer != "") {
        return true;
      }
      return "Please enter at least one character";
    }
  },
]).then(answer => {
  connection.query(
    "INSERT INTO department (name) VALUES (?)", (answer.deptName), function(err, res) {
    if (err) throw err;
    console.log(`You have entered ${answer.deptName} into your department database.`)
    inquire();
  })
});

// Add Role
const addRole = () => inquirer.prompt([
  {
    type: "input",
    name: "addRole",
    message: "What role would you like to add?",
    validate: function(answer) {
      if (answer != "") {
        return true;
      }
      return "Please enter at least one character";
    }
  },
  {
    type: "input",
    name: "roleSalary",
    message: "What is the salary for this role?",
  },
  {
    type: "input",
    name: "departmentID",
    message: "What is this role's department id?",
  },
]).then(answer => {
  connection.query(
    "INSERT INTO role SET ?", 
      {
        title: answer.addRole,
        salary: answer.roleSalary, 
        department_id: answer.departmentID, 
      }, 
      function(err, res) {
    if (err) throw err;
    console.log(`You have entered ${answer.addRole} into your role database.`)
    inquire();
  })
});

// Update Employee Role
const updateEmployeeRole = () => inquirer.prompt([
  {
    type: "input",
    name: "teamMemberUpdate",
    message: "What is the id of the employee whose role you would like to update?"
  },
  {
    type: "input",
    name: "roleIdUpdate",
    message: "What is the updated role ID?"
  }
]).then(answer => {
  connection.query(
    "UPDATE employee SET role_id = ? WHERE id = ?", [answer.roleIdUpdate, answer.teamMemberUpdate], 
      function(err, res) {
    if (err) throw err;
    console.log(`You have updated a role in your employee database.`)
    inquire();
  })
});

// Grab Employee Names
const employeeNames = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    const empNames = res.map(x => x.first_name + x.last_name);
    console.log(empNames);
  })
};
// Grab Role Names

// Grab Department Names

// initiate application
inquire()
//employeeNames()
