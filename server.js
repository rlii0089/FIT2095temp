const express = require('express');
const app = express();
const ejs = require('ejs');

app.use(express.urlencoded({ extended: true }));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

const path = require('path');

const Driver = require('./models/Driver');
const Package = require('./models/Package');

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

app.get("/drivers/delete", function(req, res) {
    res.sendFile(path.join(__dirname, "views", "delete-driver.html"));
});

app.get("/packages/delete", function(req, res) {
    res.sendFile(path.join(__dirname, "views", "delete-package.html"));
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

    console.log(packageTitle, packageWeight, packageDestination, description, isAllocated, driverID);

    let newPackage = new Package(packageTitle, packageWeight, packageDestination, description, isAllocated, driverID);
    packageDatabase.push(newPackage);
    res.redirect("/packages");
});

app.get("/drivers", function(req, res) {
    let driverID = req.body.driverID;
    driverDatabase = driverDatabase.filter(driver => driver.driverID != driverID);
    res.redirect("/drivers");
});

app.get("/packages", function(req, res) {
    let packageID = req.bodyery.packageID;
    packageDatabase = packageDatabase.filter(package => package.packageID != packageID);
    res.redirect("/packages");
});
