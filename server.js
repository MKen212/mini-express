"use strict";
/**
 * Mini Express WebServer running HTTP AND HTTPS
 * Hosts \public\index.html and interacts with web server
 */

// Set-up Express HTTP & HTTPS servers
const express   = require("express");
const fs        = require("fs");
const https     = require("https");
const app       = express();
const portHTTP  = 8080;
const portHTTPS = 8443;
const certPath  = "PATH TO YOUR CERTIFICATES, e.g. /etc/letsencrypt/live/URL";
const options   = {
  cert: fs.readFileSync(`${certPath}/fullchain.pem`),
  key: fs.readFileSync(`${certPath}/privkey.pem`)
};

// Redirect HTTP to HTTPS
app.all("*", ensureSecure);

// Set-up directory used to serve static files
app.use(express.static("./public"));

// Start HTTPS server
https.createServer(options, app)
  .listen(portHTTPS, function() {
    console.log(`Express HTTPS Web Server is running on port ${portHTTPS}...`);
  });

// Start HTTP server
app.listen(portHTTP, function(){
  console.log(`Express HTTP Web Server is running on port ${portHTTP}...`);
});

// Function to redirect HTTP to HTTPS 
function ensureSecure(req, res, next) {
  if (req.secure) {
    // OK to continue
    return next();
  }
  // If not OK, redirect to https
  res.redirect("https://" + req.hostname + req.originalUrl);
}