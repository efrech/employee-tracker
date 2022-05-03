const chalk = require("chalk");
const DB = require("./db");

//class Role
class Role {
    constructor(title, salary, department_id) {
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }
    getAll(callback) {
        const sql = `SELECT r.id, r.title, d.name AS department, r.salary FROM role r LEFT JOIN department d ON r.department_id = d.id`;
        DB.query(sql, (err, rows) => {
            if (err) {
                callback(err.message);
            } else {
                callback(null, rows)
            }
        });
    }
    addRole(title, salary, department_id) {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id})`;
        DB.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
        });
    }
}

module.exports = Role;