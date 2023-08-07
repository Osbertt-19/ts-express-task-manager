const {MongoClient} = require('mongodb')

const uri = 'mongodb://localhost:27017'
const dbName = 'tasks-db'

const client = new MongoClient(uri)

client.connect()

const db = client.db(dbName)

db.collection('api_keys').insertOne({
  key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
  comments: ['To be used by the xyz vendor'],
  version: 1,
  status: true,
  createdAt: new Date(),
  updatedAt: new Date(),
})
