// Packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const Employee = require("./lib/employee");
const Role = require("./lib/role");
const Department = require("./lib/department");
const chalk = require('chalk');


// function that shows message when starting app
afterConnection = () => {
  console.log();
  console.table(chalk.bgCyan(" ----------------------------------- "))
  console.table(chalk.bgCyan(" |*                               *| "))
  console.table(chalk.bgCyan(" |*        EMPLOYEE MANAGER       *| "))
  console.table(chalk.bgCyan(" |*                               *| "))
  console.table(chalk.bgCyan(" ----------------------------------- "))
  console.log();
  promptUser();
};

// inquirer prompt for first action
const promptUser = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choices',
      message: 'What would you like to do?',
      choices: ['View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ])
    .then((answers) => {
      const { choices } = answers;
      if (choices === "View all departments") {
        getAll(Department);
      }
      if (choices === "View all roles") {
        getAll(Role);
      }
      if (choices === "View all employees") {
        getAll(Employee);
      }
      if (choices === "Add a department") {
        addDepartmentPrompt();
      }
      if (choices === "Add a role") {
        addRolePrompt();
      }
      if (choices === "Add an employee") {
        addEmployeePrompt();
      }
      if (choices === "Update an employee role") {
        updateEmployeePrompt();
      }
      if (choices === "Exit") {
        process.exit();
      }
    });
}


//Function to view all departments
getAll = (klassParam) => {
  let klass = new klassParam;
  klass.getAll(function (err, data) {
    if (err) {
      // handle the error
      console.log(err)
    } else {
      // handle data
      console.log(`\n`);
      console.table(data)
      console.log(`\n`);
      promptUser();
    }
  }
  );
}

//Function to ask questions to add a department
addDepartmentPrompt = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: "what is the name for the new department?"
    }
  ])
    .then(answer => {
      let department = new Department;
      department.addDepartment(answer.newDepartment);
      console.log(`\n`);
      console.log(chalk.bgGray(`\n${answer.newDepartment} added to the database`));
      console.log(`\n`);
      promptUser();
    })
}


//Function inquirer to add a new role
addRolePrompt = () => {
  var allDepartments = [];
  let department = new Department;
  department.getAll(function (err, data) {
    if (err) {
      // handle the error
      console.log(err)
    } else {
      // handle data
      data.forEach(row => allDepartments.push({ name: row.name, value: row.id }));
      inquirer.prompt([
        {
          type: 'input',
          name: 'newTitle',
          message: "what is the title for the new role?"
        },
        {
          type: 'input',
          name: 'newSalary',
          message: "what is the salary for the new role?"
        },
        {
          type: 'list',
          name: 'newDepartmentId',
          message: "Assign a department id",
          choices: allDepartments
        }
      ])
        .then(answer => {
          let role = new Role;
          role.addRole(answer.newTitle, answer.newSalary, answer.newDepartmentId);
          console.log(`\n`);
          console.log(chalk.bgGray(`\n${answer.newTitle} added to the database`));
          console.log(`\n`);
          promptUser();
        })
    }
  })
}

addEmployeePrompt = () => {
  var allRoles = [];
  let role = new Role;
  let employee = new Employee;
  role.getAll(function (err, data) {
    if (err) {
      // handle the error
      console.log(err)
    } else {
      // handle data
      data.forEach(row => allRoles.push({ name: row.title, value: row.id }));
      // first_name, last_name, role_id, manager_id
      inquirer.prompt([
        {
          type: 'input',
          name: 'newFirstName',
          message: "what is the new employee first name?"
        },
        {
          type: 'input',
          name: 'newLastName',
          message: "what is the new employee last name?"
        },
        {
          type: 'list',
          name: 'newRoleId',
          message: "Assign a role id",
          choices: allRoles
        }
      ])
        .then(answer => {
          const newEmployee = { first_name: answer.newFirstName, last_name: answer.newLastName, role_id: answer.newRoleId };

          employee.getManagers(function (err, data) {
            if (err) {
              // handle the error
              console.log(err)
            } else {
              // handle data
              // first_name, last_name, role_id, manager_id
              data.unshift({value: 0, name: "None"});
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'newManagerId',
                  message: "Assign a manager id",
                  choices: data
                }
              ])
                .then(answer => {
                  newEmployee.manager_id = answer.newManagerId;
                  employee.addEmployee(newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id);
                  console.log(`\n`);
                  console.log(chalk.bgGray(`\nNew employee added to the database`));
                  console.log(`\n`);
                  promptUser();
                })
            }
          })
        })
   }})
}

updateEmployeePrompt = () => {
  var allEmployees = [];
  var allRoles = [];
  let role = new Role;
  let employee = new Employee;
  employee.getAll(function (err, data) {
    if (err) {
      // handle the error
      console.log(err)
    } else {
      // handle data
      data.forEach(row => allEmployees.push({ name: row.first_name + " " + row.last_name, value: row.id }));
      // first_name, last_name, role_id, manager_id
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: "Which employee's role do you want to update?",
          choices: allEmployees
        }
      ])
        .then(answer => {
          const employeeId = answer.employeeId;

          role.getAll(function (err, data) {
            if (err) {
              // handle the error
              console.log(err)
            } else {
              // handle data
              // first_name, last_name, role_id, manager_id
              data.forEach(row => allRoles.push({ name: row.title, value: row.id }));
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'newRoleId',
                  message: "Which role do you want to assign the selected employee?",
                  choices: allRoles
                }
              ])
                .then(answer => {
                  employee.updateEmployeeRole(employeeId, answer.newRoleId);
                  promptUser();
                })
            }
          })
        })
   }})
}

//

//Classes
// let employee = new Employee;
// console.table(employee.getAll());
// console.table(employee.addEmployee("Sandy", "Tavero", 11, 1));
// console.table(employee.updateEmployeeRole(13, 4));
// console.table(employee.getAll());


// let role = new Role;
// console.table(role.getAll());
// console.table(role.addRole("Customer Service Rep.", 42000.00, 5));
// console.table(role.getAll());

// let department = new Department;
// console.table(department.getAll());
// console.table(department.addDepartment("Customer service"));


//TODO: create class per table
//the class should have functions for queries: update an employee role
//- create index.js and innit() in server.js
//https://stackoverflow.com/questions/46210279/pass-objects-in-array-into-inquirer-list-choices - inquirer list name value pair

// var departments = [];
// for loop departments
// var d = { name: departnemt.name, value: department.id }
// departments.push(d)
// list: departments

afterConnection();