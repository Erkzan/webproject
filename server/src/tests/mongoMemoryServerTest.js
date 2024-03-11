const { MongoMemoryServer } = require('mongodb-memory-server');

async function startMongoMemoryServer() {
  const mongoServer = await MongoMemoryServer.create();
  console.log("MongoDB Memory Server started at:", mongoServer.getUri());
}

startMongoMemoryServer();
