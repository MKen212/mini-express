"use strict";
/**
 * Mini Express WebServer running HTTP & HTTPS
 * Hosts \public\index.html and interacts with web server
 */

// Set-up server
const https = require("https");
const fs = require("fs");
const express   = require("express");
const app       = express();
const helmet    = require("helmet");
const portHTTP  = 8080;
const portHTTPS = 8443;
const certPath  = "PATH TO YOUR CERTIFICATES, e.g. /etc/letsencrypt/live/URL";
const options   = {
  cert: fs.readFileSync(`${certPath}/fullchain.pem`),
  key: fs.readFileSync(`${certPath}/privkey.pem`)
};

// Use Helmet to protect from web vulnerabilities
app.use(helmet());

// Set-up directory used to serve static files
app.use(express.static("./public"));

// Start HTTP server
app.listen(portHTTP, function(){
  console.log(`Express HTTP Web Server is running on port ${portHTTP}...`);
});

// Start HTTPS server
https.createServer(options, app).listen(portHTTPS);
console.log(`Express HTTPS Web Server is running on port ${portHTTPS}...`);
