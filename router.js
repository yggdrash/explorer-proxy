const BigNumber = require('bignumber.js');
const cron = require("node-cron")
const { BlockQuery, TxQeury, AccountQuery } = require('./qeury')
const PORT = process.env.PORT || 3000
const { Ygg } = require("@yggdrash/sdk")

const host = process.env.HOST
const yggdrash_node_port = process.env.YGGDRASH_NODE_PORT

const ygg = new Ygg(new Ygg.providers.HttpProvider(`http://${host}:${yggdrash_node_port}`))
module.exports = function(app) {
    app.get('/', (req, res) => {
        res.send('<h1>Welcome to YGGDRASH!</h1>')
    })

    app.get('/blocks', async (req, res) => {
        // TODO: schedule tasks to be run on the server
        // TODO: from - size query paging
        let from = req.query.from || 0
        let size = req.query.size || 20
        let blocks = await BlockQuery.findAll(from, size, req.query.index)
        res.send(blocks)
    })

    // app.get('/moreblocks', async (req, res) => {
    //     // TODO: schedule tasks to be run on the server
    //     // TODO: from - size query paging
    //     let from = req.query.from || 0
    //     let size = req.query.size || 20
    //     let blocks = await BlockQuery.findRangeAll(from, size, req.query.index)
    //     res.send(blocks)
    // })

    app.get('/blocks/:id', async (req, res) => {
        let block = await BlockQuery.findById(req.params.id)
        res.send(block)
    })
    
    app.get('/blocks/:id/txs', async (req, res) => {
        let txs = await TxQeury.findByBlockId(req.params.id)
        res.send(txs)
    })
    
    app.get('/txs', async (req, res) => {
        let from = req.query.from || 0
        // let size = req.query.size || 10000000
        let size = req.query.size || 10000
        let txs = await TxQeury.findAll(from, size)
        // for(let i in txs) {
        //     txs[i].put("body", JSON.parse(txs[i].body))
        // }
        res.send(txs)
    })

    app.get('/txs/:txid', async (req, res) => {
        let txs = await TxQeury.findById(req.params.txid)
        res.send(txs)
    })

    //TODO: Account query
    app.get('/query/:account', async (req, res) => {
        let balance = await getBalance(req.params.account)
        console.log("b")
        console.log(balance)
        // let query = await AccountQuery.findByAccount(req.params.account, ygg)
        // let txs = await TxQeury.findByAccount(req.params.address)
        // res.send(txs)
    })

    app.get('/account/:address', async (req, res) => {
        let txs = await TxQeury.findByAccount(req.params.address)
        res.send(txs)
    })

    getBalance = async account => {
        let v = await AccountQuery.findByAccount(account, ygg)
        console.log(v)
        return v
    }

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
        console.log()
    })
}