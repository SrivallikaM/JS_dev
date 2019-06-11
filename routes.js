const express = require('express');
const router = express.Router();
const { messages, users } = require('./models');
router.get('/Messages/', async function (req, res) {
    try {

        var resp = await messages.find(

            { Receiver: req.query.user },



        )

        res.send(resp);
        res.end();
    }

    catch{
        (err) => { console.log(err); res.end(); }
    };



});

router.get('/Message/', async function (req, res) {


    try {


        var resp = await messages.find(

            { Receiver: req.query.user },



        )
        var arrMsg = resp;

        res.send(arrMsg[req.query.id])
        res.end();
    }

    catch{
        (err) => { console.log(err); res.end(); }
    };




});

router.get('/Messages/markAsImportant', async function (req, res) {


    try {



        var resp = await messages.find(

            { Receiver: req.query.user },



        )
        var m = await messages.find(

            { _id: resp[req.query.index]._id },



        )
        var mark = resp[req.query.index].markAsImp;

        var response = await messages.where('_id', resp[req.query.index]._id).update({ $set: { markAsImp: !mark } });

        res.send(response);

    }

    catch{
        (err) => { console.log(err); res.end(); }
    };





});

router.get('/deleteMessage', async function (req, res) {


    try {


        var resp = await messages.find(

            { Receiver: req.query.user },



        )

        var response = await messages.where('_id', resp[req.query.index]._id).findOneAndRemove();

        res.send(response);

    }

    catch{
        (err) => { console.log(err); res.end(); }
    };





});



router.post('/Reply', function (req, res) {


    const message_doc = messages(req.body);

    message_doc.save().then((data) => {
        res.send(data);
        res.end();
    }).catch((err) => { console.log(err); res.end() });

});
module.exports=router;