"use strict";
/**
 * Mini Express WebServer running HTTP ONLY
 * Hosts \public\index.html and interacts with web server
 */

// Set-up Express HTTP server
const express   = require("express");
const app       = express();
const portHTTP  = 8080;

// Use Helmet to protect from HTTP web vulnerabilities
const helmet    = require("helmet");
app.use(helmet());

// Set-up directory used to serve static files
app.use(express.static("./public"));

// Start HTTP server
app.listen(portHTTP, function(){
  console.log(`Express HTTP Web Server is running on port ${portHTTP}...`);
});
