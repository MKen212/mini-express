"use strict";
/**
 * Mini Express WebServer running HTTP & HTTPS
 * Hosts \public\index.html and interacts with web server
 */

// Set-up Express HTTP server
const express   = require("express");
const app       = express();
const portHTTP  = 8080;

// Use Helmet to protect from web vulnerabilities
const helmet    = require("helmet");
app.use(helmet());

// Set-up directory used to serve static files
app.use(express.static("./public"));

// Redirect HTTP to HTTPS
app.all("*", ensureSecure);

// Start HTTP server
app.listen(portHTTP, function(){
  console.log(`Express HTTP Web Server is running on port ${portHTTP}...`);
});

// Set-up HTTPS server
const https = require("https");
const fs = require("fs");
const portHTTPS = 8443;
const certPath  = "PATH TO YOUR CERTIFICATES, e.g. /etc/letsencrypt/live/URL";
const options   = {
  cert: fs.readFileSync(`${certPath}/fullchain.pem`),
  key: fs.readFileSync(`${certPath}/privkey.pem`)
};

// Start HTTPS server
https.createServer(options, app).listen(portHTTPS);
console.log(`Express HTTPS Web Server is running on port ${portHTTPS}...`);

// Function to redirect HTTP to HTTPS 
function ensureSecure(req, res, next) {
  if (req.secure) {
    // OK to continue
    return next();
  }
  // If not OK, redirect to https
  res.redirect("https://" + req.hostname + req.url);
}