"use strict"

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const api = require("./api/api")

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api)
app.use('/api/v1', api)

app.get('/', (req, res) => {
    res.send(`<p>Bienvenido, para acceder a la api ve a <u><i>/api</i></u> o <u><i>/api/v1</i></u> </p>`)
})

app.use( (req, res, next) => { 
    res.status(404)
    res.json({
        message: "Not found"
    })
})

app.use( (err, req, res, next) => { 
    res.status(500)
    res.json({
        message: err.message
    })
})

module.exports = app
