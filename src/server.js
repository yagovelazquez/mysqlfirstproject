const express = require('express')
const app = express()

require('./database');


app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const routes = require('./routes')
app.use(routes)






const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

