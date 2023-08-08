const {MongoClient} = require('mongodb')
const seed=(dbName)=>{
  const uri = 'mongodb://localhost:27017'
  
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
  
}
seed('tasks-test-db')
