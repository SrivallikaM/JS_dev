const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
const { messages, users } = require('./models');
const routes=require('./routes');
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require('./db')();
app.use('/api/messages',routes);



app.post('/Register', function (req, res) {


    const user_doc = users(req.body);
    user_doc.save().then((data) => {
        res.send(data);

    }).catch((err) => { console.log(err); res.end() });

});
app.post('/Login', function (req, res) {


    users.findOne(

        { username: req.body.username, password: req.body.password },



    ).then(function (doc) {
        if (doc) {
            res.send("Found");
            res.end();
        } else {
            res.send('Empty');
            res.end();
        }
    }).catch((err) => { console.log(err); res.end(); });



});




app.listen(3000, function (req, res) {
    console.log("Server listening");
})