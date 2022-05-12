SELECT
	emp.id,
	emp.firstname,
	emp.lastname,
	role.title,
	dept.name department,
	role.salary,
	concat(manager.firstname, " ", manager.lastname) manager_name
	
FROM
    ((employee emp
    LEFT JOIN employee manager ON manager.id = emp.manager_id)
    LEFT JOIN role on emp.role_id = role.id
    LEFT JOIN department dept ON role.department_id = dept.id)
ORDER BY
	emp.firstname