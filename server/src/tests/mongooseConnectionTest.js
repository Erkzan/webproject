const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

async function connectToMongo() {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  console.log("Attempting to connect to URI:", uri); // Log the URI for debugging

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Successfully connected to MongoDB Memory Server");
    await mongoServer.stop();
  } catch (error) {
    console.error("Failed to connect to MongoDB Memory Server", error);
  }
}

connectToMongo();
