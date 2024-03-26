const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "21012011103",
  database: "robofriends_db",
});

con.connect((err) => {
  if (err) {
    console.log("Error connecting to MYSQL " + err);
  } else {
    console.log("Connected to Robofriends Database");
  }
});

function getRandomImageName() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return `${randomString}.png`;
}

app.get("/", (req, res) => {
  // Generate a random image name
  const randomImageName = getRandomImageName();

  const homePage = `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RoboFriends</title>
        <style>
          body {
            background: linear-gradient(to bottom, #3498db, #8e44ad);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .container {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            text-align: center;
          }
          .robo-image {
            background: linear-gradient(to bottom, #3498db, #8e44ad);
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto;
            transition: transform 0.3s;
          }
          .robo-image:hover {
            transform: scale(1.5);
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
          }
          p {
            font-size: 18px;
            color: #666;
            margin: 20px 0;
          }
          .btn-container {
            display: flex;
            justify-content: center;
          }
          .btn {
            text-decoration: none;
            font-size: 18px;
            border: 1px solid #3498db;
            padding: 8px 16px;
            border-radius: 50px;
            color: #3498db;
            margin: 0 10px;
            transition: background-color 0.3s, color 0.3s;
          }
          .btn:hover {
            background-color: #3498db;
            color: #fff;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://robohash.org/${randomImageName}" alt="RoboImage" class="robo-image">
          <h1>Welcome to UVPCE</h1>
          <p>Your friendly community of students</p>
          <div class="btn-container">
            <a href="/register" class="btn">Register</a>
            <a href="/login" class="btn">Login</a>
          </div>
        </div>
      </body>
    </html>
  `;
  res.send(homePage);
});

app.get("/register", (req, res) => {
  const registrationForm = `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RoboFriends Registration</title>
        <style>
          body {
            background: linear-gradient(to bottom, #3498db, #8e44ad);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .container {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            text-align: center;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
          }
          form {
            margin: 20px 0;
          }
          input {
            width: 100%;
            border: 1px solid #ccc;
            padding: 8px;
            margin: 10px 0;
            border-radius: 5px;
          }
          button {
            width: 100%;
            background: #3498db;
            color: #fff;
            border: none;
            padding: 10px;
            border-radius: 50px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>RoboFriend Registration</h1>
          <form method="post" action="/register">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Register</button>
          </form>
          <p>Already registered? <a href="/login">Login</a></p>
        </div>
      </body>
    </html>
  `;
  res.send(registrationForm);
});

app.post("/register", (req, res) => {
    const { username, password } = req.body;
    const newUser = { username, password };
  
    con.query("INSERT INTO users SET ?", newUser, (err, results) => {
      if (err) {
        console.error("Error registering user: " + err);
        res.send(`
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>RoboFriends</title>
              <style>
                body {
                  background: linear-gradient(to bottom, #3498db, #8e44ad);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                }
                .container {
                  background: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                  text-align: center;
                }
                h1 {
                  font-size: 24px;
                  font-weight: bold;
                  color: #333;
                  margin: 20px 0;
                }
                p {
                  font-size: 18px;
                  color: #ff0000;
                  margin: 20px 0;
                }
                .btn-container {
                  display: flex;
                  justify-content: center;
                }
                .btn {
                  text-decoration: none;
                  font-size: 18px;
                  border: 1px solid #3498db;
                  padding: 8px 16px;
                  border-radius: 50px;
                  color: #3498db;
                  margin: 0 10px;
                  transition: background-color 0.3s, color 0.3s;
                }
                .btn:hover {
                  background-color: #3498db;
                  color: #fff;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1 class="error">Registration Failed</h1>
                <p class="error">There was an error during registration. Please try again.</p>
                <a href="/register" class="btn">Go back to registration</a>
              </div>
            </body>
          </html>
        `);
      } else {
        res.redirect("/login");
      }
    });
  });
  

app.get("/login", (req, res) => {
  const loginForm = `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RoboFriends Login</title>
        <style>
          body {
            background: linear-gradient(to bottom, #3498db, #8e44ad);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .container {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            text-align: center;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
          }
          form {
            margin: 20px 0;
          }
          input {
            width: 100%;
            border: 1px solid #ccc;
            padding: 8px;
            margin: 10px 0;
            border-radius: 5px;
          }
          button {
            width: 100%;
            background: #3498db;
            color: #fff;
            border: none;
            padding: 10px;
            border-radius: 50px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>RoboFriend Login</h1>
          <form method="post" action="/login">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
          </form>
          <p>Not registered yet? <a href="/register">Register</a></p>
        </div>
      </body>
    </html>
  `;
  res.send(loginForm);
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    con.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (err, results) => {
        if (err) {
          console.error("Error during login: " + err);
          res.send(`
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>RoboFriends</title>
                <style>
                  body {
                    background: linear-gradient(to bottom, #3498db, #8e44ad);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                  }
                  .container {
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    text-align: center;
                  }
                  h1 {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    margin: 20px 0;
                  }
                  p {
                    font-size: 18px;
                    color: #666;
                    margin: 20px 0;
                  }
                  .error {
                    font-size: 18px;
                    color: #ff0000;
                  }
                  .btn-container {
                    display: flex;
                    justify-content: center;
                  }
                  .btn {
                    text-decoration: none;
                    font-size: 18px;
                    border: 1px solid #3498db;
                    padding: 8px 16px;
                    border-radius: 50px;
                    color: #3498db;
                    margin: 0 10px;
                    transition: background-color 0.3s, color 0.3s;
                  }
                  .btn:hover {
                    background-color: #3498db;
                    color: #fff;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1 class="error">Login Failed</h1>
                  <p class="error">There was an error during login. Please try again.</p>
                  <a href="/login" class="btn">Go back to login</a>
                </div>
              </body>
            </html>
          `);
        } else if (results.length > 0) {
          res.send(`
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>RoboFriends</title>
                <style>
                  body {
                    background: linear-gradient(to bottom, #3498db, #8e44ad);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                  }
                  .container {
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    text-align: center;
                  }
                  h1 {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    margin: 20px 0;
                  }
                  p {
                    font-size: 18px;
                    color: #28a745;
                    margin: 20px 0;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>Login Successful</h1>
                  <p>Welcome back, ${username}!</p>
                </div>
              </body>
            </html>
          `);
        } else {
          res.send(`
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>RoboFriends</title>
                <style>
                  body {
                    background: linear-gradient(to bottom, #3498db, #8e44ad);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                  }
                  .container {
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    text-align: center;
                  }
                  h1 {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    margin: 20px 0;
                  }
                  p {
                    font-size: 18px;
                    color: #ff0000;
                    margin: 20px 0;
                  }
                  .btn-container {
                    display: flex;
                    justify-content: center;
                  }
                  .btn {
                    text-decoration: none;
                    font-size: 18px;
                    border: 1px solid #3498db;
                    padding: 8px 16px;
                    border-radius: 50px;
                    color: #3498db;
                    margin: 0 10px;
                    transition: background-color 0.3s, color 0.3s;
                  }
                  .btn:hover {
                    background-color: #3498db;
                    color: #fff;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1 class="error">Login Failed</h1>
                  <p class="error">Incorrect username or password. Please try again.</p>
                  <a href="/login" class="btn">Go back to login</a>
                </div>
              </body>
            </html>
          `);
        }
      }
    );
  });
  

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 ....");
});
