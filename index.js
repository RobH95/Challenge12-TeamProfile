const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = [];
/*
let jared = new Manager('Jared', 1, 'jared@fakemail.com', 1)
let alec = new Engineer('Alec', 2, 'alec@fakemail.com', 'ibealec')
let grace = new Engineer('Grace', 3, 'grace@fakemail.com', 'gchoi2u')
let tammer = new Engineer('Tammer', 4, 'tammer@fakemail.com', 'tammerg')
let john = new Intern('John', 5, 'john@fakemail.com', '2University')
team.push(jared, alec, grace, tammer, john)

// console.log(team)

let html = render(team);
// console.log(html)
*/


function askForEmployeeInfo() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'employeeType',
      message: 'What is the employee type?',
      choices: ['Manager', 'Engineer', 'Intern', 'Finish'],
    },
    {
      type: 'input',
      name: 'employeeId',
      message: 'What is the employee ID?',
      when: function (answers) {
        return answers.employeeType !== 'Finish';
      }
    },
    {
      type: 'input',
      name: 'employeeName',
      message: 'What is the employee name?',
      when: function (answers) {
        return answers.employeeType !== 'Finish';
      }
    },
    {
      type: 'input',
      name: 'employeeEmail',
      message: 'What is the employee email?',
      when: function (answers) {
        return answers.employeeType !== 'Finish';
      }
    },
    {
      type: 'input',
      name: 'officeId',
      message: 'What is the office ID?',
      when: function (answers) {
        return answers.employeeType === 'Manager';
      },
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is the GitHub username?',
      when: function (answers) {
        return answers.employeeType === 'Engineer';
      },
    },
    {
      type: 'input',
      name: 'school',
      message: 'What is the school name?',
      when: function (answers) {
        return answers.employeeType === 'Intern';
      },
    },
  ])
  .then((answers) => { 
    console.log('\nEmployee Information:');
    console.log(`Type: ${answers.employeeType}`);
    console.log(`ID: ${answers.employeeId}`);
    console.log(`Name: ${answers.employeeName}`);
    console.log(`Email: ${answers.employeeEmail}`);
    if (answers.officeId) {
      console.log(`Office ID: ${answers.officeId}`);
    }
    if (answers.github) {
      console.log(`GitHub Username: ${answers.github}`);
    }
    if (answers.school) {
      console.log(`School: ${answers.school}`);
    }
    console.log('-----------------------\n');
    if (answers.employeeType === 'Finish') {
        // if the user has selected 'Finish', write the file to outputPath
        fs.writeFile(outputPath, render(team), (err) => {
            console.log('File created successfully!');
        })
    } else {
        // otherwise, initialise newEmployee and determine whether to create a Manager, Engineer or Intern object
        let newEmployee;
        if (answers.employeeType === 'Manager') {
            newEmployee = new Manager(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.officeId);
        } else if (answers.employeeType === 'Engineer') {
            newEmployee = new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.github);
        } else if (answers.employeeType === 'Intern') {
            newEmployee = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.school);
        }
        team.push(newEmployee);
        askForEmployeeInfo();
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

askForEmployeeInfo();


