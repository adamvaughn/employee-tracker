ALTER TABLE employee
    DROP FOREIGN KEY employee_ibfk_1

ALTER TABLE employee
ADD CONSTRAINT employee_ibfk_1
    FOREIGN KEY (`role_id`)
    REFERENCES `role` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE

ALTER TABLE employee
    DROP FOREIGN KEY employee_ibfk_2

ALTER TABLE employee
ADD CONSTRAINT employee_ibfk_2
    FOREIGN KEY (`manager_id`)
    REFERENCES `employee` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE

ALTER TABLE role
    DROP FOREIGN KEY role_ibfk_1

ALTER TABLE role
ADD CONSTRAINT role_ibfk_1
    FOREIGN KEY (`department_id`)
    REFERENCES `department` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
