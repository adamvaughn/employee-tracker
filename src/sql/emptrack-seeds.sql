USE employeetracker;

INSERT INTO employee (firstname, lastname) VALUES ('Elizabeth','Bennet');

INSERT INTO employee (firstname, lastname, manageryn) VALUES ('William','Collins','Y');

INSERT INTO department (name) VALUES ('Engineering');

INSERT INTO role (title, salary) VALUES ('Software Engineer', 75000.00), ('Engineering Manager', 125000.00);

UPDATE employee SET role_id=(select id from role where title = 'Engineering Manager') where employee.firstname = 'William' and employee.lastname = 'Collins';

UPDATE role SET department_id=(select id from department where name = 'Engineering') where title in ('Software Engineer','Engineering Manager');

UPDATE employee SET role_id=(select id from role where title = 'Software Engineer'), manager_id=2 where employee.firstname = 'Elizabeth' and employee.lastname = 'Bennet';