// Import required modules
const express = require('express');
const app = express();
const ejs = require('ejs');

app.use(express.static("images")); // Serve static files from images directory
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.engine('html', ejs.renderFile); // Set ejs as the view engine
app.set('view engine', 'html'); // Set view engine to html

const path = require('path'); // Import path module to work with file and directory paths

// Import models
const Driver = require('./models/Driver');
const Package = require('./models/Package');

// Create driver and package database
let driverDatabase = [];
let packageDatabase = [];

app.set('port', 8080); // Set port number

// Start server
app.listen(app.get('port'), function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Listening on port " + app.get('port'));
});

// GET route for home page
app.get("/", function(req, res) {
    res.render("index");
});

// GET route for listing all drivers
app.get("/drivers", function(req, res) {
    res.render("list-drivers", { drivers: driverDatabase }); // Pass driverDatabase to list-drivers.html
});

// GET route for listing all packages
app.get("/packages", function(req, res) {
    res.render("list-packages", { packages: packageDatabase }); // Pass packageDatabase to list-packages.html
});


// GET routes for adding drivers
app.get("/drivers/add", function(req, res) {
    res.sendFile(path.join(__dirname, "views", "add-driver.html"));
});

// GET routes for adding packages
app.get("/packages/add", function(req, res) {
    res.render("add-package", { drivers: driverDatabase }); // Pass driverDatabase to add-package.html
});

// POST routes for adding drivers
app.post("/drivers", function(req, res) {
    // Extract data from request body
    const { driverName, driverDepartment, driverLicence, driverIsActive } = req.body;
  
    // Validate driver name (3-20 alphabetic characters)
    if (!/^[A-Za-z]{3,20}$/.test(driverName)) {
        return res.sendFile(path.join(__dirname, "views", "invalid-data.html"));
    }

    // Validate driver department
    if (!["food", "furniture", "electronic"].includes(driverDepartment)) {
        return res.sendFile(path.join(__dirname, "views", "invalid-data.html"));
    }

    // Validate driver licence (5 alphanumeric characters)
    if (!/^[A-Za-z0-9]{5}$/.test(driverLicence)) {
        return res.sendFile(path.join(__dirname, "views", "invalid-data.html"));
    }

    console.log(driverName, driverDepartment, driverLicence, driverIsActive);

    // Create new driver object and push it to driverDatabase
    const newDriver = new Driver(driverName, driverDepartment, driverLicence, driverIsActive);
    driverDatabase.push(newDriver);
    res.redirect("/drivers"); // Redirect to /drivers route
});

// POST routes for adding packages
app.post("/packages", function(req, res) {
    // Extract data from request body
    const { packageTitle, packageWeight, packageDestination, description, isAllocated, driverID } = req.body;

    // Validate package title (3-15 alphanumeric characters)
    if (!/^[A-Za-z0-9]{3,15}$/.test(packageTitle)) {
        return res.sendFile(path.join(__dirname, "views", "invalid-data.html"));
    }

    // Validate package weight (positive number)
    if (isNaN(packageWeight) || packageWeight <= 0) {
        return res.sendFile(path.join(__dirname, "views", "invalid-data.html"));
    }

    // Validate package destination (5-15 alphanumeric characters)
    if (!/^[A-Za-z0-9]{5,15}$/.test(packageDestination)) {
        return res.sendFile(path.join(__dirname, "views", "invalid-data.html"));
    }

    // Validate description (string can take special characters with length between 0 and 30 inclusive)
    if (!/^[A-Za-z0-9!@#$%^&*()_+]{0,30}$/.test(description)) {
        return res.sendFile(path.join(__dirname, "views", "invalid-data.html"));
    }

    // Validate driver ID (5 alphanumeric characters)
    if (!/^[A-Za-z0-9]{5}$/.test(driverID)) {
        return res.sendFile(path.join(__dirname, "views", "invalid-data.html"));
    }

    console.log(packageTitle, packageWeight, packageDestination, description, isAllocated, driverID);

    // Create new package object and push it to packageDatabase
    let newPackage = new Package(packageTitle, packageWeight, packageDestination, description, isAllocated, driverID);
    packageDatabase.push(newPackage);
    res.redirect("/packages"); // Redirect to /packages route
});

// GET route for deleting drivers
app.get("/drivers/delete", function(req, res) {
    res.sendFile(path.join(__dirname, "views", "delete-driver.html"));
});

// GET route for deleting packages
app.get("/packages/delete", function(req, res) {
    res.sendFile(path.join(__dirname, "views", "delete-package.html"));
});

// POST routes for deleting drivers
app.post("/drivers/delete", function(req, res) {
    let driverID = req.body.driverID;
    for(let i = 0; i < driverDatabase.length; i++) {
        if(driverDatabase[i].driverID == driverID) {
            console.log("Deleting driver with ID: " + driverID);
            driverDatabase.splice(i, 1);
            break;
        }
    }
    res.redirect("/drivers");
});

// POST routes for deleting packages
app.post("/packages/delete", function(req, res) {
    let packageID = req.body.packageID;
    for(let i = 0; i < packageDatabase.length; i++) {
        if(packageDatabase[i].packageID == packageID) {
            packageDatabase.splice(i, 1);
            break;
        }
    }
    res.redirect("/packages");
});

// Route for invalid routes
app.use(function(req, res) {
    res.status(404).sendFile(path.join(__dirname, "views", "invalid-route.html"));
});
