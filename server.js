const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employee_trackerDB"
});

connection.connect(err  => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
});

const inquire = () => inquirer.prompt([
  {
      type: "list",
      message: "What would you like to do? (Use Arrow Keys)",
      name: "choice",
      choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Update Employee Role",
          "Exit"
      ]
  }
]).then(answer => {
  switch (answer.choice) {
      case "View All Employees":
          allEmployees();
          break;
      case "View All Employees By Department":
          break;
      case "View All Employees By Manager":
          break;
      case "Add Employee":
          break;
      case "Update Employee Role":
          break;
      case "Exit":
          connection.end();
          break;
  }
});

// View all employees
const allEmployees = () => {
  connection.query("SELECT * FROM ", (err, res) => {
      if (err) throw err;
      console.table(res);
  })
};

// // What artist do you want to search?
// const artist = () => inquirer.prompt([
//   {
//       type: "input",
//       name: "artist",
//       message: "Which artist would you like to search?"
//   }
// ]).then(answer => {
//   const artistAnswer = answer.artist;
//   connection.query("SELECT * FROM top5000 WHERE artist = ?", [artistAnswer], (err, res) => {
//       if (err) throw err;
//       console.table(res);
//       connection.end();
//       });
//   }
// );

// // What song do you want to search?
// const song = () => inquirer.prompt([
//   {
//       type: "input",
//       name: "song",
//       message: "Which song would you like to search?"
//   }
// ]).then(answer => {
//   const songAnswer = answer.song;
//   connection.query("SELECT * FROM top5000 WHERE song = ?", [songAnswer], (err, res) => {
//       if (err) throw err;
//       console.table(res);
//       connection.end();
//       });
//   }
// );

// // Artists who appear more than once
// const artistTwoPlus = () => {
//   connection.query("SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1", (err, res) => {
//       if (err) throw err;
//       console.table(res);
//       connection.end();
//   })
// };

// // Between certain range
// const positionRange = () => inquirer.prompt([
//   {
//       type: "input",
//       name: "startingNum",
//       message: "starting value",
//       validate: function(value) {
//           if (!isNaN(value)) {
//               return true;
//           }
//           return false;
//       }
//   },
//   {
//       type: "input",
//       name: "endingNum",
//       message: "ending value",
//       validate: function(value) {
//           if (!isNaN(value)) {
//               return true;
//           }
//           return false;
//       }
//   }
// ]).then(answer => {
//   const startVal = answer.startingNum;
//   const endVal = answer.endingNum;
//   connection.query("SELECT * FROM top5000 WHERE position BETWEEN ? AND ?", [startVal, endVal], (err, res) => {
//       if (err) throw err;
//       console.table(res);
//       connection.end();
//       });
//   }
// );


// inquire();
