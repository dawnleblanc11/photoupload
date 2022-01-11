const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
const fileupload = require("express-fileupload");
const sequelize = require("./config/connection");

// default option (quality of image and other options in documentation {})
app.use(fileupload());
// setup handlebars.js as the template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const PORT = process.env.PORT || 3001;

// Middleware

//app.use(express.json());
// not sure if this should be true or false??
//app.use(express.urlencoded({ extended: false }));
// connect the css file
app.use(express.static('public'));
app.use(express.static('upload'));

// sets handlebars as the defualt template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on routes
//app.use(require('./controllers/'));

app.get("", (req, res) => {
  res.render("index");
});

app.post("", (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }
  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + "/upload/" + sampleFile.name;
  console.log(sampleFile);

  // use mv() to place file on the server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    res.send("File uploaded");
  });
});
// used for connection to tdb and the server
sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => console.log("Now listening"));
});
