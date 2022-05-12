select
	IFNULL(details.deptname, 'No associated department') AS 'Department',
	details.empcount AS 'Employee Count',
	concat('$', format(sum(details.totalsalary), 2)) AS 'Total Utilized Budget'
from
(select 
	count(employee.id) empcount,
	role.title,
	sum(role.salary) totalsalary,
	department.name deptname
from
	employee
	RIGHT JOIN role ON employee.role_id = role.id
	LEFT JOIN department ON role.department_id = department.id
	group by role.title, role.salary, department.name
	having count(employee.id) > 0
) details
GROUP BY
	details.empcount,
	details.deptname