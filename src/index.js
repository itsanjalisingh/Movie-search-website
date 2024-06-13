const express = require("express");
const path = require("path");
const app = express();
//const hbs = require("hbs");

const collection = require("./mongodb");

app.use(express.urlencoded({ extended: false }));

const tempelatePath = path.join(__dirname, "../tempelates");
const publicPath = path.join(__dirname, "../public");
console.log(publicPath);

app.set("view engine", "hbs");
app.set("views", tempelatePath);
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };


  await collection.insertMany([data]);

  res.render("home");
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });
    if (check) {
      if (check.password === req.body.password) {

        res.render("home");
      } else {
        res.send('<script>alert("Wrong password"); window.location.href = "/";</script>');
      }
    } else {
      res.send('<script>alert("Don\'t have an account, Create One."); window.location.href = "/";</script>');
    }
  } catch (error) {
    // Error handling
    console.error(error);
    res.send('<script>alert("An error occurred. Please try again later."); window.location.href = "/";</script>');
  }
});


app.listen(3000, () => {
  console.log("port connected");
});
