const should = require('should')
const { Block } = require('../qeury')

describe('qeury', () => {
    it('should get number of block', async () => {
        let count = await Block.count()
        count.should.a.Number()
    })

    it('should find block by index', async () => {
        let index = '1884';
        let block = await Block.findByIndex(index)
        should(block.header.index).be.exactly(index)
    })

    it('should find block by id', async () => {
        let blockId = 'b8476eaa1b136505efd4ab4a618564d618f4122e0e838a1c051da7aeab41d620'
        let foundBlock = await Block.findById(blockId)
        should(foundBlock.blockId).be.exactly(blockId)
        //TODO es에 블록 해시 저장하기
    })

    it('should find blocks', async () => {
        let blocks = await Block.findAll(0, 20)
        should(blocks).be.an.Array()
        should(blocks).have.length(20)      
    })
})