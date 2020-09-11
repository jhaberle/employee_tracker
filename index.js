const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Rockies_01",
    database: "employee_trackerdb",
})

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  
})

function afterConnection(){
    connection.query('SELECT * FROM employee_trackerdb.employees;', (err, res) => {
        if (err) throw (err);
        console.log(res);
        connection.end();

    })
}

