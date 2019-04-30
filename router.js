const { Block, TxQeury } = require('./qeury')
const db = require('./db')
const PORT = process.env.PORT || 3000;
module.exports = function(app) {
    app.get('/', (req, res) => {
        res.send('<h1>Welcome to YGGDRASH!</h1>')
    })
    
    app.get('/blocks', async (req, res) => {
        let from = req.query.from || 0
        let size = req.query.size || 20
        let blocks = await Block.findAll(from, size)
        res.send(blocks)
    })
    
    app.get('/blocks/:id', async (req, res) => {
        let block = await Block.findById(req.params.id)
        res.send(block)
    })
    
    app.get('/blocks/:id/txs', async (req, res) => {
        console.log(req.params.id)
        let txs = await TxQeury.findByBlockId(req.params.id)
        res.send(txs)
    })
    
    app.get('/txs', async (req, res) => {
        let from = req.query.from || 0
        let size = req.query.size || 20
        let txs = await TxQeury.findAll(from, size)
        res.send(txs)
    })
    
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
        console.log()
    })
}