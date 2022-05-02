//class Department
const DB = require("./db");

class Department {
    constructor(name) {
        this.name = name
    }
    getAll() {
        const sql = `SELECT id, name FROM department`;
        DB.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            return console.table(rows);
        });
    }
    addDepartment(name) {
        const sql = `INSERT INTO department (name) VALUES ("${name}")` ;
        DB.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            return console.log(`Added ${name} to the database`);
        });
    }

}

module.exports = Department;