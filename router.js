const { BlockQuery, TxQeury, AccountQuery } = require('./qeury')
const PORT = process.env.PORT || 3000
const { Ygg } = require("@yggdrash/sdk")

let host = process.env.HOST
let yggdrash_node_port = process.env.YGGDRASH_NODE_PORT

const ygg = new Ygg(new Ygg.providers.HttpProvider(`http://${host}:${yggdrash_node_port}`))
module.exports = function(app) {
    app.get('/', (req, res) => {
        res.send('<h1>Welcome to YGGDRASH!</h1>')
    })
    
    app.get('/blocks', async (req, res) => {
        let from = req.query.from || 0
        let size = req.query.size || 20
        let blocks = await BlockQuery.findAll(from, size)
        res.send(blocks)
    })
    
    app.get('/blocks/:id', async (req, res) => {
        console.log(req.params.id)
        let block = await BlockQuery.findById(req.params.id)
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
        console.log(txs)
        res.send(txs)
    })
    
    app.get('/query/:account', async (req, res) => {
        let query = await AccountQuery.findByAccount(req.params.account, ygg)
        res.send(query)
    })

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
        console.log()
    })
}