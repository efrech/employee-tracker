//class Department
const DB = require("./db");

class Department {
    getAll(callback) {
        const sql = `SELECT id, name FROM department`;
        DB.query(sql, (err, rows) => {
            if (err) {
                callback(err.message);
            } else {
                callback(null, rows)
            }
        });
    }
    addDepartment(name) {
        const sql = `INSERT INTO department (name) VALUES ("${name}")` ;
        DB.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
        });
    }

}

module.exports = Department;