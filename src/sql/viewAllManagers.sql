SELECT
	emp.id,
	concat(emp.firstname, " ", emp.lastname) name,
	role.title,
	dept.name department,
	role.salary,
	concat(manager.firstname, " ", manager.lastname) manager_name
	
FROM
    ((employee emp
    LEFT JOIN employee manager ON manager.id = emp.manager_id)
    LEFT JOIN role on emp.role_id = role.id
    LEFT JOIN department dept ON role.department_id = dept.id)
WHERE
    emp.manageryn = 'Y'
ORDER BY
	name