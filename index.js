const app = require('express')()
const express = require('express')
const path = require('path')
const cors = require('cors')

let port = process.env.PORT || 3000

const data = require('./questions.json')

app.set('json spaces', 2)

app.use(express.static("public"))
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/spec.html'))
})

app.get('/questions/:topic/:number', (req, res) => {
    let questions = []

    if (req.params.number > data[req.params.topic].length) {
        res.send(`too many questions, please specify up to ${data[req.params.topic].length}`)
        return
    } else if (!data[req.params.topic]) {
        res.send(`Topic not found`)
    }
    let numberOfQuestions = 0
    usedIndexes = new Set()

    while (numberOfQuestions < req.params.number) {
        let random = Math.floor(Math.random() * data[req.params.topic].length)
        while (usedIndexes.has(random)) {
            random = Math.floor(Math.random() * data[req.params.topic].length)
        }

        questions.push(data[req.params.topic][random])
        usedIndexes.add(random)
        numberOfQuestions++
    }
    res.send(questions)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})