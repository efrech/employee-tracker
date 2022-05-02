INSERT INTO department (name)
VALUES ("Marketing"),
       ("Accounting"),
       ("IT"),
       ("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 75000.00, 1), -- role_id 1
       ("Accounting Manager", 75000.00, 2), -- role_id 2
       ("IT Manager", 75000.00, 3), -- role_id 3
       ("HR Manager", 75000.00, 4), -- role_id 4
       ("Marketing Coordinator", 50000.00, 1), -- role_id 5
       ("Accounting Specialist", 50000.00, 2), -- role_id 6
       ("IT Specialist", 50000.00, 3), -- role_id 7
       ("HR Assistant", 50000.00, 4), -- role_id 8
       ("Marketing Director", 120000.00, 1), -- role_id 9
       ("Sales Representative", 50000.00, 1); -- role_id 10

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Maria", "Sampson", 1, 5),
       ("Dan", "Smith", 2, NULL),
       ("Sam", "Torn", 3, NULL),
       ("Adam", "Doe", 4, NULL),
       ("Henry", "Roth", 9, NULL), 
       ("Tony", "Garcia", 5, 1),
       ("Mario", "Sandler", 6, 2),
       ("Sonia", "Simpson", 7, 3),
       ("Doug", "Kardashian", 8, 4),
       ("Alex", "Kent", 5, 1),
       ("Marlyn", "Wayne", 6, 2),
       ("Lucy", "Keats", 7, 3),
       ("Joe", "Whitmore", 8, 4);


       