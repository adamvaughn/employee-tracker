const chalk = require('chalk');
const inquirer = require('inquirer');

const connection = require('../db/connection');
const { launchTitle, appTitle } = require('./title');

// empty array to push departments, roles, or employees to for multiple choice
let roleOptions = [];
let manOptions = [];
let empOptions = [];
let depOptions = [];

// welcome message
const welcomePrompt = () => {
  launchTitle(appTitle.hex, appTitle.text);
  console.log(
    chalk.hex('#E4D874').bgHex('#000000')('\n |  Welcome to Employee Tracker an easy to use cms for keeping track of your team!  | \n')
  );
};

const prompts = [
  {
    name: 'continue',
    type: 'confirm',
    message: chalk.hex('#DDB9E4').bgHex('#000000')('\n | Enter To Continue To Main Menu | \n'),
  },
  {
    name: 'main_menu',
    type: 'list',
    message: chalk.hex('#74A9E4').bgHex('#000000')('\n | MAIN MENU | \n'),
    choices: ['view', 'add', 'edit', 'remove'],
  },
  {
    name: 'select_view',
    type: 'list',
    message: chalk.hex('#74A9E4').bgHex('#000000')('\n | VIEW BY... | \n'),
    choices: ['employee', 'department', 'role', 'manager'],
  },
  {
    name: 'select_dep',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Department | \n'),
    choices: depOptions,
  },
  {
    name: 'select_role',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Role | \n'),
    choices: roleOptions,
  },
  {
    name: 'select_emp',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Select An Employee | \n'),
    choices: empOptions,
  },
  {
    name: 'select_mgmt',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Manager | \n'),
    choices: manOptions,
  },
  {
    name: 'first_name',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | First Name | \n'),
  },
  {
    name: 'last_name',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Last Name | \n'),
  },
  {
    name: 'select_table',
    type: 'list',
    message: chalk.hex('#74A9E4').bgHex('#000000')('\n | Select | \n'),
    choices: ['employee', 'department', 'role'],
  },
  {
    name: 'dep_name',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Department Name | \n'),
  },
  {
    name: 'title',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Title | \n'),
  },
  {
    name: 'salary',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Starting Salary | \n __ DECIMAL FORMAT __ \n __ DO NOT INCLUD $ __'),
  },
  {
    name: 'emp_params',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | What Would You Like To Update? | \n'),
    choices: ['first name', 'last name', 'role', 'manager'],
  },
  {
    name: 'dep_input',
    type: 'input',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | Department Name | \n'),
  },
  {
    name: 'role_input',
    type: 'list',
    message: chalk.hex('#74E485').bgHex('#000000')('\n | What Would You Like To Update? | \n'),
    choices: ['title', 'salary', 'department'],
  },
];

// query to push options to options array
const optionsQuery = (x, y, z) => {
  let query = x;
  let param = y;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, res) => {
      if (err) throw err;
      res.forEach((obj) => {
        z.push(obj[param]);
      });
      resolve(z);
    });
  });
};

// algo to remove deleted item from multiple choice listes
const removeOpt = (arr, selection) => {
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === selection) {
      arr.splice(i, 1);
      i--;
    }
  }
};

module.exports = { roleOptions, manOptions, empOptions, depOptions, welcomePrompt, prompts, optionsQuery, removeOpt };