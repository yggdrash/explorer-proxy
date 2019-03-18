const { Client } = require('elasticsearch')
const client = new Client({ 
    node: 'http://localhost:9200',
    log: 'trace'
})

client.ping({
    requestTimeout: 30000,
}, error => {
    if (error) {
        console.error('elasticsearch cluster is down!')
    } else {
        console.log('Everything is ok')
    }
})

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