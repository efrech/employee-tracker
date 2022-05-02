// Packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const Employee = require("./lib/employee");
const Role = require("./lib/role");
const Department = require("./lib/department");

//Classes
let employee = new Employee;
console.table(employee.getAll());
// console.table(employee.addEmployee("Sandy", "Tavero", 11, 1));
console.table(employee.updateEmployeeRole(13, 4));
console.table(employee.getAll());


let role = new Role;
console.table(role.getAll());
// console.table(role.addRole("Customer Service Rep.", 42000.00, 5));
console.table(role.getAll());

let department = new Department;
console.table(department.getAll());
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