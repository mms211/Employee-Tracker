INSERT INTO department (id, name)
VALUES (1, "Sales"), (2, "Engineering"), (3, "Finance"), (4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1), 
    (2, "Salesperson", 80000, 1), 
    (3, "Account Manager", 120000, 1),
    (4, "Lead Engineer", 150000, 2), 
    (5, "Software Engineer", 120000, 2), 
    (6, "Accountant", 125000, 3),
    (7, "Lawyer", 190000, 4),
    (8, "Legal Team Lead", 250000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, 3),
    (2, "Mike", "Chan", 2, 1),
    (5, "Kevin", "Tupik", 5, 4),
    (7, "Sarah", "Lourd", 7, 8);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (3, "Ashley", "Rodriguez", 3),
    (4, "Carlos", "Colon", 4),
    (6, "Malia", "Brown", 6),
    (8, "Tom", "Allen", 8);