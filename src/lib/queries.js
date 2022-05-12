const path = require('path');
const fs = require('fs');

const queries = {
    viewAllEmployees: fs.readFileSync(path.join(__dirname, '../sql/viewAllEmployees.sql')).toString(),
    viewAllDepartments: fs.readFileSync(path.join(__dirname, '../sql/viewAllDepartments.sql')).toString(),
    viewAllRoles: fs.readFileSync(path.join(__dirname, '../sql/viewAllRoles.sql')).toString(),
    viewAllManagers: fs.readFileSync(path.join(__dirname, '../sql/viewAllManagers.sql')).toString(),
    addEmployee: fs.readFileSync(path.join(__dirname, '../sql/addEmployee.sql')).toString(),
    addDepartment: fs.readFileSync(path.join(__dirname, '../sql/addDepartment.sql')).toString(),
    addRole: fs.readFileSync(path.join(__dirname, '../sql/addRole.sql')).toString(),
    updateEmployee: fs.readFileSync(path.join(__dirname, '../sql/updateEmployee.sql')).toString(),
    viewEmployeesByManager: fs.readFileSync(path.join(__dirname, '../sql/viewEmployeesByManager.sql')).toString(),
    viewUtilizedBudget: fs.readFileSync(path.join(__dirname, '../sql/viewUtilizedBudget.sql')).toString(),
    deleteEmployee: fs.readFileSync(path.join(__dirname, '../sql/deleteEmployee.sql')).toString(),
    deleteRole: fs.readFileSync(path.join(__dirname, '../sql/deleteRole.sql')).toString(),
    deleteDepartment: fs.readFileSync(path.join(__dirname, '../sql/deleteDepartment.sql')).toString()
}

module.exports = queries;