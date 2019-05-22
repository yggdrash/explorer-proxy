const { Client } = require('elasticsearch')
// const esClient = require('elasticsearch').Client();
// require('./elasticsearch-cacheable')(esClient, {
//     redisHost: '10.10.10.10',
//     cacheTime: 3
// });

const client = new Client({ 
    node: process.env.ELASTICSEARCH_NODE,
    // log: 'trace'
})
const BRACH_ID = process.env.BRANCH_ID
const CONTRACT_VERSION = process.env.CONTRACT_VERSION
const INDEX_PREFIX = 'yggdrash'
const BLOCK_INDEX = `${INDEX_PREFIX}-block`
const TX_INDEX = `${INDEX_PREFIX}-tx`

const TxQeury = {
    count: async () => {
        const { count } = await client.count({
            index: TX_INDEX
        })
        return count
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
                        "timestamp": {
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
    },

    findByAccount: async (author) => {
        const res = await client.search({
            index: TX_INDEX,
            body: {
                query: {
                    match: {
                        author
                    }
                }
            }
        })
        return res.hits.hits.map(item => {
            return item._source
        })
    }
}

const BlockQuery = {
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
                        'index': index
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

    findAll: async (from, size, index) => {
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
                        "timestamp": {
                            order: "desc"
                        }
                    }
                ]
            }
        })

        if(index) {
            console.log(index)
        }

        return res.hits.hits.map(item => {
            return item._source
        })
    },

    // findRangeAll: async (from, size, index) => {
    //     const res = await client.search({
    //         index: BLOCK_INDEX,
    //         body: {
    //             from,
    //             size,
    //             query: {
    //                 "range": {
    //                     "index": {
    //                         "gte": index,
    //                         "lte": index + 20
    //                     }
    //                 }
    //             },
    //             sort: [
    //                 {
    //                     "timestamp": {
    //                         order: "desc"
    //                     }
    //                 }
    //             ]
    //         }
    //     })
    //
    //     return res.hits.hits.map(item => {
    //         return item._source
    //     })
    // },
}

const AccountQuery = {
    findByAccount: async (account, ygg) => {
        return await ygg.client
            .getBalance(BRACH_ID, CONTRACT_VERSION, account)
    }
}

module.exports = {
    BlockQuery,
    TxQeury,
    AccountQuery
}