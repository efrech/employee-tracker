//class Employee
const DB = require("./db");

class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
    getAll() {
        const sql = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(e1.first_name, " ", e1.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee e1 ON e1.id = e.manager_id`;
        DB.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            return console.table(rows);
        });
    }
    addEmployee(first_name, last_name, role_id, manager_id) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id})` ;
        DB.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            return console.log(`Added ${first_name} ${last_name} to the database`);
        });
    }
    updateEmployeeRole(id, role_id) {
        const sql = ` UPDATE employee SET role_id = ${role_id} WHERE id = ${id}` ;
        DB.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            return console.log(`Updated employee's role`);
        });
    }

}

module.exports = Employee;