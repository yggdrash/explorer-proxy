const should = require('should')
const { Block } = require('../qeury')

describe('qeury', () => {
    it('should get number of block', async () => {
        let count = await Block.count();
        count.should.a.Number()
    })

    it('should find block by index', async () => {
        let block = await Block.findByIndex(10);
        should(block.header.index).be.exactly('10')
    })

    it('should find block by id', async () => {
    })
})