const app = require('express')()
let port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Yoghurt! bliyb 3')
})

app.get('/bois', (req, res) => {
    res.send({
        "hi": "hellp"
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})