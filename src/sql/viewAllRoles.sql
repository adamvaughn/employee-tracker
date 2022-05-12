SELECT
    r.id,
    r.title,
    r.salary,
    dept.name department
FROM
    role r
    LEFT JOIN department dept ON r.department_id = dept.id
ORDER BY
    r.title