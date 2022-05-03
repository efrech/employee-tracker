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
function promptUser() {
  inquirer.prompt ([
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
                // 'Update an employee manager',
                // "View employees by department",
                // 'Delete a department',
                // 'Delete a role',
                // 'Delete an employee',
                // 'View department budgets',
                // 'No Action'
              ]
    }
  ])
    .then((answers) => {
      const { choices } = answers; 
      if (choices === "View all departments") {
        let department = new Department;
        console.table(department.getAll(function(err, data) {
          if(err) {
             // handle the error
             console.log(err)
          } else {
          // handle data
            console.table(data)
          }
       }
       ));
      }
      if (choices === "View all roles") {
        let role = new Role;
        console.table(role.getAll(function(err, data) {
          if(err) {
             // handle the error
             console.log(err)
          } else {
          // handle data
            console.table(data)
          }
       }));
      }
      if (choices === "View all employees") {
        let employee = new Employee;
        employee.getAll();
      }
      if (choices === "Add a department") {
        addDepartmentPrompt();
      }
      if (choices === "Add a role") {
        addRolePrompt();
      }
      // if (choices === "Add an employee") {
      //   addEmployeePrompt();
      // }
      // if (choices === "Update an employee role") {
      //   updateEmployeePrompt();
      // }

    });
  }

  //Function to ask questions to add a department
  addDepartmentPrompt = () => {
    inquirer.prompt ([
      {
        type: 'input',
        name: 'newDepartment',
        message: "what is the name for the new department?"
      }
    ])
    .then(answer => {
      let department = new Department;
      department.addDepartment(answer.newDepartment);
    })
  }


  //Function inquirer to add a new role
  addRolePrompt = () => {
    var allDepartments = [];
    let department = new Department;
    var rows = [];
    department.getAll(function(err, data) {
      if(err) {
         // handle the error
         console.log(err)
      } else {
      // handle data
        data.forEach(row => allDepartments.push({name: row.name, value: row.id}));

        inquirer.prompt ([
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
          role.addRole(answer.newTitle, answer.newSalary, answer.newDepartmentId, function(err, data) {
            if(err) {
               // handle the error
               console.log(err)
            } else {
              // handle data
              console.log(data)
            }
         });
        })
      }
   })
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