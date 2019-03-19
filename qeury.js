const { Client } = require('elasticsearch')
const client = new Client({ 
    node: 'http://localhost:9200',
    // log: 'trace'
})
const INDEX = 'yggdrash'

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
            index: INDEX,
        })
        return count;
    },

    findByIndex: async (index) => {
        const res = await client.search({
            index: INDEX,
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
            index: INDEX,
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
            index: INDEX,
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
    Block
}