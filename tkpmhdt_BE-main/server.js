const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors");
const helmet = require('helmet');
const dbconfig = require('./api/config/db.config');
const https = require("https");
const fs = require("fs");


app.use((request, response, next) => {
  response.set('X-Content-Type-Options', 'nosniff');
  next();
});

app.use(helmet());


app.use(cors())
const options = {
    key: fs.readFileSync("./api/config/ca.key"),
    cert: fs.readFileSync("./api/config/ca.crt"),
  };


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// database
const db = require("./api/models");
db.sequelize.sync(
    { alter: false }
);

//routes
require('./api/routes/auth.router')(app)
require('./api/routes/admin.router')(app)
require('./api/routes/user.router')(app)


const port = dbconfig.PORT || 8080
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}.`);
// })
https.createServer(options, app).listen(3003, () => {
    console.log(`HTTPS server started on port ${dbconfig.PORT}}`);
});


