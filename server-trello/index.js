"use strict"
const app = require("express")()
app.use(require('express-mongo-sanitize')())
app.use(require('helmet')())
app.use(require("xss-clean")())
app.use(require("hpp")())
const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
app.use(limiter)
app.use(require("body-parser").json())
app.use(require("./route"))
console.log("app listen on 8090")
app.listen(8090)