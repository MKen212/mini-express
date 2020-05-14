"use strict";
/**
 * Mini Express WebServer running HTTP & HTTPS
 * Hosts \public\index.html and interacts with web server
 */


// Set-up server
const express  = require("express");
const app      = express();
const port     = 8080;

// setup directory used to serve static files
app.use(express.static("./public"));

// start server
app.listen(port, function(){
  console.log(`Express Web Server is running on port ${port}...`);
});
