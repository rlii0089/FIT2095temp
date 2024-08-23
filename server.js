const express = require('express');
const app = express();
const ejs = require('ejs');

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

const path = require('path');

const Driver = require('./models/Driver');
const Package = require('./models/Package');

app.use(express.urlencoded({ extended: true }));

let driverDatabase = [];
let packageDatabase = [];

app.set('port', 8080);
app.listen(app.get('port'), function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Listening on port " + app.get('port'));
});

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/drivers", function(req, res) {
    res.render("list-drivers", { drivers: driverDatabase });
});

app.get("/packages", function(req, res) {
    res.render("list-packages", { packages: packageDatabase });
});

app.get("/drivers/add", function(req, res) {
    res.sendFile(path.join(__dirname, "views", "add-driver.html"));
});

app.get("/packages/add", function(req, res) {
    res.sendFile(path.join(__dirname, "views", "add-package.html"));
});


app.post("/drivers", function(req, res) {
    let driverName = req.body.driverName;
    let driverDepartment = req.body.driverDepartment;
    let driverLicence = req.body.driverLicence;
    let driverIsActive = req.body.driverIsActive;

    console.log(driverName, driverDepartment, driverLicence, driverIsActive);

    let newDriver = new Driver(driverName, driverDepartment, driverLicence, driverIsActive);
    driverDatabase.push(newDriver);
    res.redirect("/drivers");
});

app.post("/packages", function(req, res) {
    let packageTitle = req.body.packageTitle;
    let packageWeight = req.body.packageWeight;
    let packageDestination = req.body.packageDestination;
    let description = req.body.description;
    let isAllocated = req.body.isAllocated;
    let driverID = req.body.driverID;

    let newPackage = new Package(packageTitle, packageWeight, packageDestination, description, isAllocated, driverID);
    packageDatabase.push(newPackage);
    res.redirect("/packages");
});

