const { MongoClient, ServerApiVersion } = require('mongodb');
let _db;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
function get_client() {

  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_CLUSTER = process.env.DB_CLUSTER;
  const uri = process.env.CONNECTION_STRING;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  return client;
}

async function test_connection(client) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    
  }
}

const initDb = () => {
    const DB_NAME = process.env.DB_NAME;

  if (_db) {
    return _db
  }
  const client = get_client();
  _db = client.db(DB_NAME);
  return _db;
}

module.exports = {
  initDb
}