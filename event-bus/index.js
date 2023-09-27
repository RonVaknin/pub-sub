const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    console.log('Received event', req.body)
    events.push(event);
    let status = 200;
    let statusString = "OK";
    axios.post('http://localhost:4000/events', event).catch(err => {console.error("failed 4000")});
    axios.post('http://localhost:4001/events', event).catch(err => {console.error("failed 4001")});
    axios.post('http://localhost:4002/events', event).catch(err => {console.error("failed 4002")});
    axios.post('http://localhost:4003/events', event).catch(err => {console.error("failed 4003")});
    res.send({ status: "OK" });
});


app.get('/events', (req, res) => {
    res.send(events);
});


app.listen(4005);
console.log("Event bus listening on 4005");