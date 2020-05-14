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
const portHTTP  = 8080;
const portHTTPS = 8443;
const options   = {
  cert: fs.readFileSync("/etc/letsencrypt/live/ethfundraiser.xyz/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/ethfundraiser.xyz/privkey.pem")
};

// setup directory used to serve static files
app.use(express.static("./public"));

// start server
app.listen(portHTTP, function(){
  console.log(`Express Web Server is running on port ${portHTTP}...`);
});
https.createServer(options, app).listen(portHTTPS);
