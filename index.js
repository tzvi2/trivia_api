const app = require('express')()
const cors = require('cors')

const data = require('./questions.json')

app.use(cors())

app.get('/questions/:topic/:number', (req, res) => {
    let questions = []

    if (req.params.number > data[req.params.topic].length) {
        res.send(`Too many questions. Please specify up to ${data[req.params.topic].length}.`)
        return
    } else if (!data[req.params.topic]) {
        res.send(`Topic not found`)
    }
    let numberOfQuestions = 0
    let usedIndexes = new Set()

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

module.exports = app;