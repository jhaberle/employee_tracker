const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Rockies_01",
  database: "employee_trackerdb",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  introToApp();
});
// afterConnection();

function introToApp() {
  inquirer
    .prompt({
      name: "intro",
      type: "list",
      message: "Select Action Below:",
      choices: ["Add Employee", "Remove Employee", "View All Employees"],
    })
    .then(function (answers) {
      if (answers.intro === "Add Employee") {
        addEmployee();
      } else if (answers.intro === "Remove Employee") {
        RemoveEmployee();
      } else if (answers.intro === "View All Employees") {
        viewAllEmployees();
      }
    });
}



function addEmployee() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "First Name",
        name: "fist_name",
      },
      {
        type: "input",
        message: "Last Name",
        name: "last_name",
      },
      {
        name: "department",
        type: "list",
        message: "Select Department Below:",
        choices: ["Sales", "Legal", "Finance", "Engineering"],
      },
      {
        name: "job",
        type: "list",
        message: "Select Role Below:",
        choices: [
          "Sales Associate",
          "Legal Lead",
          "Team Lead",
          "Software Engineer",
          "Lead Engineer",
          "Sales Lead",
          "Accountant",
        ],
      },
      {
        type: "input",
        message: "Employee Salary",
        name: "salary",
      },
      {
        type: "input",
        message: "Employee Manager",
        name: "manager",
      },
    ])
    .then(function (answers) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          title: answers.job,
          department: answers.department,
          salary: answers.salary,
          manager: answers.manager,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee Added to Database!");
            
      
        }
      );
      introToApp();
    });
}

function viewAllEmployees(){
    connection.query("SELECT * FROM employee_trackerdb.employees", function(err, res) {
      if (err) throw err;
      var data = ["id", "First Name", "Last Name", "Title", "Department", "Salary", "Manager"];

      for (var i = 0; i < res.length; i++) {
        empLog = [res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].title + " | " + res[i].department + " | " + res[i].salary + " | " + res[i].manager]
        data.push(empLog);
      }
      console.table(empLog);
    })
    introToApp();
}
