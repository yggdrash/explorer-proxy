const { Client } = require('elasticsearch')
const client = new Client({ 
    node: 'http://localhost:9200',
    // log: 'trace'
})
const INDEX_PREFIX = 'yggdrash'
const BLOCK_INDEX = `${INDEX_PREFIX}-block`
const TX_INDEX = `${INDEX_PREFIX}-tx`

const TxQeury = {
    count: async () => {
        const { count } = await client.count({
            index: TX_INDEX
        })
        return count;
    },

    findAll: async (from, size) => {
        const res = await client.search({
            index: TX_INDEX,
            body: {
                from,
                size,
                query: {
                    "match_all": {}
                },
                sort: [
                    {
                        "header.timestamp": {
                            order: "desc"
                        }
                    }
                ]
            }
        })

        return res.hits.hits.map(item => {
            return item._source
        })
    },

    findById: async (txId) => {
        const res = await client.search({
            index: TX_INDEX,
            body: {
                query: {
                    match: {
                        txId
                    }
                }
            }
        })

        return res.hits.hits[0]._source
    },

    findByBlockId: async (blockId) => {
        const res = await client.search({
            index: TX_INDEX,
            body: {
                query: {
                    match: {
                        blockId
                    }
                }
            }
        })

        return res.hits.hits.map(item => {
            return item._source
        })
    }
}

const Block = {
    ping: () => {
        client.ping({
            requestTimeout: 30000,
        }, error => {
            if (error) {
                console.error('elasticsearch cluster is down!')
            } else {
                console.log('Everything is ok')
            }
        })
    },

    count: async () => {
        const { count } = await client.count({
            index: BLOCK_INDEX,
        })
        return count;
    },

    findByIndex: async (index) => {
        const res = await client.search({
            index: BLOCK_INDEX,
            body: {
                query: {
                    match: {
                        'header.index': index
                    }
                }
            }
        })

        return res.hits.hits[0]._source
    },

    findById: async (id) => {
        const res = await client.search({
            index: BLOCK_INDEX,
            body: {
                query: {
                    match: {
                        'blockId': id
                    }
                }
            }
        })

        return res.hits.hits[0]._source
    },

    findAll: async (from, size) => {
        const res = await client.search({
            index: BLOCK_INDEX,
            body: {
                from,
                size,
                query: {
                    "match_all": {}
                },
                sort: [
                    {
                        "header.timestamp": {
                            order: "desc"
                        }
                    }
                ]
            }
        })

        return res.hits.hits.map(item => {
            return item._source
        })
    }
}

module.exports = {
    Block,
    TxQeury
}