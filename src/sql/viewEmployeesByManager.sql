SELECT
	IFNULL(CONCAT(manager.firstname, " ", manager.lastname),'No Manager') manager_name,
    GROUP_CONCAT(
        emp.firstname, " ", emp.lastname
        SEPARATOR ', '
    ) employees
FROM
    ((employee emp
    LEFT JOIN employee manager ON manager.id = emp.manager_id))
GROUP BY
    IFNULL(CONCAT(manager.firstname, " ", manager.lastname),'No Manager')
ORDER BY
	manager_name