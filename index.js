const express = require('express')
const app = express()
const { Block, TxQeury } = require('./qeury')

const PORT = 3000

app.get('/', (req, res) => {
    res.send('Welcome to YGGDRASH!')
})

app.get('/blocks', async (req, res) => {
    let from = req.query.from || 0
    let size = req.query.size || 20
    let blocks = await Block.findAll(from, size)
    res.send(blocks)
})

app.get('/txs', async (req, res) => {
    let from = req.query.from || 0
    let size = req.query.size || 20
    let txs = await TxQeury.findAll(from, size)
    res.send(txs)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})