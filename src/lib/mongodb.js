import { MongoClient, ServerApiVersion } from "mongodb";

// connection string uri
if (!process.env.ATLAS_MONGODB_CONNECTION_STRING) {
  throw new Error("Please add your Mongo URI to .env.local");
}
const uri = process.env.ATLAS_MONGODB_CONNECTION_STRING;
//connection OPTIONS to specify Stable API Version v1
const conOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};
// Create a client
let client = null;
let clientPromise = null;
if (process.env.NODE_ENV === "local") {
  // In local env, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
// export default clientPromise

// OR resolve clientPromise and connect to database. then export
// the module-scoped db object
const connectedClient = await clientPromise;
const db = connectedClient.db("defi");
export default db;
