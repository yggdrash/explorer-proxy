const should = require('should')
const { Block, TxQeury } = require('../qeury')

describe('TxQeury', () => {
    it('should get number of txs', async () => {
        let count = await TxQeury.count()
        count.should.a.Number()
    })

    it('should find txs', async () => {
        let txs = await TxQeury.findAll(0, 20)
        should(txs).be.an.Array()
        should(txs).have.length(20)
    })

    it('should find tx by id', async () => {
        let lastestTxs = await TxQeury.findAll(0, 1)
        let txId = lastestTxs[0].txId
        should.exists(txId)
        let foundTx = await TxQeury.findById(txId)
        should.exists(foundTx)
    })

    it('should find txs by blockId', async () => {
        let lastestBlocks = await Block.findAll(0, 1)
        let blockId = lastestBlocks[0].blockId
        should.exist(blockId)
        let foundTxs = await TxQeury.findByBlockId(blockId)
        should.exists(foundTxs)
        foundTxs.forEach(element => {
            element.blockId.should.exactly(blockId)
        })
    })
})

describe('BlockQuery', () => {
    it('should get number of block', async () => {
        let count = await Block.count()
        count.should.a.Number()
    })

    it('should find block by index', async () => {
        let count = await Block.count();
        let index = count-1;
        let block = await Block.findByIndex(index)
        should(block.header.index).be.exactly(index+"")
    })

    it('should find block by id', async () => {
        let count = await Block.count();
        let index = count-1;
        let block = await Block.findByIndex(index)
        let blockId = block.blockId;
        let foundBlock = await Block.findById(blockId)
        should(foundBlock.blockId).be.exactly(blockId)
    })

    it('should find blocks', async () => {
        let blocks = await Block.findAll(0, 20)
        should(blocks).be.an.Array()
        should(blocks).have.length(20)      
    })
})