const express = require("express");



var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


const fs = require('fs')
let empData = JSON.parse(fs.readFileSync('./Data/emp.json', 'utf-8'))
let surveyData = JSON.parse(fs.readFileSync('./Data/survey.json', 'utf-8'))

app.get('/emp_data', (req, res) => {

    try {
        res.status(200).json({
            empData
        })
    }

    catch (err) {
        res.status(400).json({
            err
        })
    }
})

app.get('/survey_data', (req, res) => {

    try {
        res.status(200).json({
            surveyData
        })
    }

    catch (err) {
        res.status(400).json({
            err
        })
    }
})

app.post('/survey_assigned', (req, res) => {
    var data = req.body;
    try {
        console.log(data)
        res.status(200).json({
            data
        })
    }

    catch (err) {
        res.status(400).json({
            err
        })
    }
})


module.exports = app;
