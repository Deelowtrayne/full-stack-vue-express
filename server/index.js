const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
 
const posts = require('./routes/api/posts');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/posts', posts);



app.listen(PORT, () => console.log('App running on port', PORT));