const connection = require('../config/config');
const queries = require('./queries');
const consoleTable = require('console.table');
const inquirer = require("inquirer");
const actionsList = require('./actionslist');
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

const start = () => {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: actionsList.actionsList
        })
        .then((answer) => {
            if (answer.action === 'Exit') {
                exitProgram();
            } else {
                switch (answer.action) {
                    case actionsList.actionsList[0]:
                        viewAllEmployeesQ();
                        break;
                    case actionsList.actionsList[1]:
                        viewAllDeptsQ();
                        break;

                    case actionsList.actionsList[2]:
                        viewAllRolesQ();
                        break;

                    case actionsList.actionsList[3]:
                        addEmployeeQ();
                        break;

                    case actionsList.actionsList[4]:
                        addDepartmentQ();
                        break;
                    
                    case actionsList.actionsList[5]:
                        addRoleQ();
                        break;
                    
                    case actionsList.actionsList[6]:
                        updateEmployeeRoleQ();
                        break;
                    
                    case actionsList.actionsList[7]:
                        updateEmployeeMgrQ();
                        break;
                    
                    case actionsList.actionsList[8]:
                        viewEmployeesByManagerQ();
                        break;

                    case actionsList.actionsList[9]:
                        viewUtilizedBudgetQ();
                        break;

                    case actionsList.actionsList[10]:
                        deleteEmployeeQ();
                        break;
                    
                    case actionsList.actionsList[11]:
                        deleteRoleQ();
                        break;
                    
                    case actionsList.actionsList[12]:
                        deleteDepartmentQ();
                        break;
                }
            }

        });
}

const getRoles = () => {
    return query(queries.viewAllRoles);
}
const getEmployees = () => {
    return query(queries.viewAllEmployees);
}
const getDepartments = () => {
    return query(queries.viewAllDepartments);
}
const getManagers = () => {
    return query(queries.viewAllManagers);
}

const viewAllEmployeesQ = async () => {
    try {
        const rows = await getEmployees();
        console.table(rows);
        start();
    } catch (err) {
        console.log(err);
    }
}

const viewAllDeptsQ = async () => {
    try {
        const rows = await getDepartments();
        console.table(rows);
        start();
    } catch (err) {
        console.log(err);
    }
}

const viewAllRolesQ = async () => {
    try {
        const rows = await getRoles();
        console.table(rows);
        start();
    } catch (err) {
        console.log(err);
    }
}

const viewEmployeesByManagerQ = async () => {
    try {
        const rows = await query(queries.viewEmployeesByManager);
        console.table(rows);
        start();
    } catch (err) {
        console.log(err);
    }
}

const viewUtilizedBudgetQ = async () => {
    try {
        const rows = await query(queries.viewUtilizedBudget);;
        console.table(rows);
        start();
    } catch (err) {
        console.log(err);
    }
}

const addEmployeeQ = async () => {
    try {
        // define questions first
        const promptUser = () => {
            return inquirer
                .prompt([
                    {
                        name: "empFirstName",
                        type: "input",
                        message: "Please enter FIRST NAME.",
                    },
                    {
                        name: "empLastName",
                        type: "input",
                        message: "Please enter LAST NAME.",
                    },
                    {
                        name: "empManagerYN",
                        type: "rawlist",
                        message: "Is the employee a manager? Select N for No or Y for Yes.",
                        choices: ["N", "Y"]
                    },
                    {
                        name: "empRoleId",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            roles.forEach((role) => {
                                const roleObj = {
                                    name: role.title,
                                    value: role.id
                                }
                                choiceArray.push(roleObj)
                            })
                            return choiceArray;
                        },
                        message: "Select a role for the new employee."
                    },
                    {
                        name: "empManagerId",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            managers.forEach((mgr) => {
                                const mgrObj = {
                                    name: mgr.name,
                                    value: mgr.id
                                }
                                choiceArray.push(mgrObj)
                            })
                            return choiceArray;
                        },
                        message: "Select a manager for the new employee."
                    }
                ])
                .then((answer) => {
                    connection.query(
                        queries.addEmployee,
                        {
                            firstname: answer.empFirstName,
                            lastname: answer.empLastName,
                            role_id: answer.empRoleId,
                            manager_id: answer.empManagerId,
                            manageryn: answer.empManagerYN
                        },
                        (err) => {
                            if (err) throw err;
                            console.log(`The new employee ${answer.empFirstName} ${answer.empLastName} was successfully added.`);
                            start();
                        });
                });
        }

        const roles = await getRoles();
        const managers = await getManagers();
        await promptUser();

    } catch (err) {
        console.log(err);
    }
}

const addDepartmentQ = async () => {
    try {
        const promptUser = () => {
            return inquirer
                .prompt([
                    {
                        name: "deptName",
                        type: "input",
                        message: "Please enter a department NAME.",
                    }
                ])
                .then((answer) => {
                    connection.query(
                        queries.addDepartment,
                        {
                            name: answer.deptName
                        },
                        (err) => {
                            if (err) throw err;
                            console.log(`The ${answer.deptName} was successfully added.`); 
                            start();                          
                        });
                });
        }

        await promptUser();

    } catch (err) {
        console.log(err);
    }
}

const addRoleQ = async () => {
    try {
        const promptUser = () => {
            return inquirer
                .prompt([
                    {
                        name: "roleTitle",
                        type: "input",
                        message: "Please enter a NAME for the new role.",
                    },
                    {
                        name: "roleSalary",
                        type: "input",
                        message: "Please enter a SALARY for the new role. E.G 10000.00",
                    },
                    {
                        name: "roleDeptId",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            depts.forEach((dept) => {
                                const deptObj = {
                                    name: dept.department_name,
                                    value: dept.id
                                }
                                choiceArray.push(deptObj)
                            })
                            return choiceArray;
                        },
                        message: "Select a DEPARTMENT for the new role."

                    }
                ])
                .then((answer) => {                    
                    connection.query(
                        queries.addRole,
                        {
                            title: answer.roleTitle,
                            salary: answer.roleSalary,
                            department_id: answer.roleDeptId
                        },
                        (err) => {
                            if (err) throw err;
                            console.log(`${answer.roleTitle} was successfully added.`); 
                            start();                          
                        });
                });
        }

        const depts = await getDepartments();
        await promptUser();
    } catch (err) {
        console.log(err);
    }
}

const updateEmployeeRoleQ = async () => {
    try {
        const promptUser = () => {
            return inquirer
                .prompt([
                    {
                        name: "empID",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            emps.forEach((emp) => {
                                const empObj = {
                                    name: `${emp.firstname} ${emp.lastname}`,
                                    value: emp.id
                                }
                                choiceArray.push(empObj)
                            })
                            return choiceArray;
                        },
                        message: "Please select an employee whose role you wish to update.",
                    },
                    {
                        name: "empRoleId",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            roles.forEach((role) => {
                                const roleObj = {
                                    name: role.title,
                                    value: role.id
                                }
                                choiceArray.push(roleObj)
                            })
                            return choiceArray;
                        },
                        message: "Select a new role for the employee."
                    }
                ])
                .then((answer) => {                    
                    connection.query(
                        queries.updateEmployee,
                        [
                            {
                                role_id: answer.empRoleId
                            },
                            {
                                id: answer.empID
                            }
                        ],
                        (err) => {
                            if (err) throw err;
                            console.log(`The employee's role was updated successfully!`); 
                            start();                          
                        });
                });
        }

        const emps = await getEmployees();
        const roles = await getRoles();
        await promptUser();

    } catch (err) {
        console.log(err);
    }
}

const updateEmployeeMgrQ = async () => {
    try {
        const promptUser = () => {
            return inquirer
                .prompt([
                    {
                        name: "empID",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            emps.forEach((emp) => {
                                const empObj = {
                                    name: `${emp.firstname} ${emp.lastname}`,
                                    value: emp.id
                                }
                                choiceArray.push(empObj)
                            })
                            return choiceArray;
                        },
                        message: "Please select an employee whose manager you wish to update.",
                    },
                    {
                        name: "empManagerId",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            managers.forEach((mgr) => {
                                const mgrObj = {
                                    name: mgr.name,
                                    value: mgr.id
                                }
                                choiceArray.push(mgrObj)
                            })
                            return choiceArray;
                        },
                        message: "Select a new manager for the employee."
                    }
                ])
                .then((answer) => {                    
                    connection.query(
                        queries.updateEmployee,
                        [
                            {
                                manager_id: answer.empManagerId
                            },
                            {
                                id: answer.empID
                            }
                        ],
                        (err) => {
                            if (err) throw err;
                            console.log(`The employee's manager was successfully updated.`); 
                            start();                          
                        });
                });
        }

        const emps = await getEmployees();
        const managers = await getManagers();
        await promptUser();

    } catch (err) {
        console.log(err);
    }
}

const deleteEmployeeQ = async () => {
    try {
        const promptUser = () => {
            return inquirer
                .prompt([
                    {
                        name: "empID",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            emps.forEach((emp) => {
                                const empObj = {
                                    name: `${emp.firstname} ${emp.lastname}`,
                                    value: emp.id
                                }
                                choiceArray.push(empObj)
                            })
                            return choiceArray;
                        },
                        message: "Please select an employee you would like to DELETE. Note: You may wish to update this manager's employees first; otherwise, existing employees will be set to a null manager.",
                    }
                ])
                .then((answer) => {                    
                    connection.query(
                        queries.deleteEmployee,
                        {
                            id: answer.empID
                        },
                        (err) => {
                            if (err) throw err;
                            console.log(`The employee was deleted successfully! Make sure to review and update employee managers as needed.`); 
                            start();                          
                        });
                });
        }

        const emps = await getEmployees();
        await promptUser();

    } catch (err) {
        console.log(err);
    }
}

const deleteRoleQ = async () => {
    try {
        const promptUser = () => {
            return inquirer
                .prompt([
                    {
                        name: "roleID",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            roles.forEach((role) => {
                                const roleObj = {
                                    name: role.title,
                                    value: role.id
                                }
                                choiceArray.push(roleObj)
                            })
                            return choiceArray;
                        },
                        message: "Please select role you would like to DELETE. Note: You may wish to update the affected employees' role first; otherwise, existing employees will be set to a null role.",
                    }
                ])
                .then((answer) => {                    
                    connection.query(
                        queries.deleteRole,
                        {
                            id: answer.roleID
                        },
                        (err) => {
                            if (err) throw err;
                            console.log(`The role was deleted successfully! Make sure to review and update employee roles as needed.`); 
                            start();                          
                        });
                });
        }

        const roles = await getRoles();
        await promptUser();

    } catch (err) {
        console.log(err);
    }
}

const deleteDepartmentQ = async () => {
    try {
        const promptUser = () => {
            return inquirer
                .prompt([
                    {
                        name: "deptID",
                        type: "rawlist",
                        choices: function () {
                            const choiceArray = [];
                            depts.forEach((dept) => {
                                const deptObj = {
                                    name: dept.department_name,
                                    value: dept.id
                                }
                                choiceArray.push(deptObj)
                            })
                            return choiceArray;
                        },
                        message: "Please select role you would like to DELETE. Note: You may wish to update the affected employees' role first; otherwise, existing employees will be set to a null role.",
                    }
                ])
                .then((answer) => {                    
                    connection.query(
                        queries.deleteDepartment,
                        {
                            id: answer.deptID
                        },
                        (err) => {
                            if (err) throw err;
                            console.log(`The department was deleted successfully! Make sure to review and update roles as needed.`); 
                            start();                          
                        });
                });
        }

        const depts = await getDepartments();
        await promptUser();

    } catch (err) {
        console.log(err);
    }
}

const exitProgram = () => {
    console.log("Have a great day!");
    return connection.end();
}

module.exports = { start }