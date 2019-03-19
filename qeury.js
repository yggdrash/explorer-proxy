const { Client } = require('elasticsearch')
const client = new Client({ 
    node: 'http://localhost:9200',
    // log: 'trace'
})

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

    search: () => {
        client.search({
            index: 'block',
            body: {
                "query": {
                    "match": {
                        "_id": "29"
                    }
                }
            }
        }).then(res => {
            console.log(res.hits.hits[0])
        }).catch(err => {
            console.error(err)
        })   
    },

    count: async () => {
        const { count } = await client.count({
            index: 'block',
        })
        return count;
    },

    findByIndex: async (index) => {
        const res = await client.search({
            index: 'block',
            body: {
                query: {
                    match: {
                        'header.index': index
                    }
                }
            }
        })

        return res.hits.hits[0]._source
    }
}

module.exports = {
    Block
}