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

let jared = new Manager('Jared', 1, 'jared@fakemail.com', 1)
team.push(jared);

let alec = new Engineer('Alec', 2, 'alec@fakemail.com', 'ibealec')
team.push(alec);

let grace = new Engineer('Grace', 3, 'grace@fakemail.com', 'gchoi2u')
team.push(grace);

let tammer = new Engineer('Tammer', 4, 'tammer@fakemail.com', 'tammerg')
team.push(tammer);

let john = new Intern('John', 5, 'john@fakemail.com', '2University')
team.push(john);

// console.log(team)

let html = render(team);
// console.log(html)

fs.writeFile(outputPath, html, function (err) {
    if (err) throw err;
    console.log('Saved to file');
});

