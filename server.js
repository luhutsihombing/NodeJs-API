const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 3010;

const cors = require("cors");

/*
var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
*/


app.use(cors());

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.get("/", (req, res) => {
    res.json("REST API with node-express-mysql");
  });

require("./app/routes/auth.routes")(app);
require("./app/routes/crud.routes")(app);
