const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const users = require('./routes/users.js');
const config = require('./config/database');


mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on('connected', ()=>{
    console.log('Connected to the database'+ config.database);
});
mongoose.connection.on('error', (err)=>{
    console.log('Database error: '+ err);
});
// Set public folder
app.use(express.static(path.join(__dirname, 'public')));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// Cors Middleware
app.use(cors());
// Body Parser Middleware
app.use(bodyParser.json());
app.use('/users', users);
// Index Route
app.get('/',(req, res)=>{
    res.send('Invalid Endpoint ');
});

app.listen(port, ()=>{
    console.log('app runnning on port: ' + port)
})