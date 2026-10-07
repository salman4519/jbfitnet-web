import { MongoClient, type Db } from "mongodb";

// Reuse one client across hot reloads and warm serverless invocations.
const globalForMongo = globalThis as unknown as {
  _mongoClient?: Promise<MongoClient>;
  _mongoIndexes?: Promise<void>;
};

export class DatabaseNotConfiguredError extends Error {}

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new DatabaseNotConfiguredError("MONGODB_URI is not set");

  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 8000,
    })
      .connect()
      .catch((err) => {
        globalForMongo._mongoClient = undefined;
        throw err;
      });
  }

  const client = await globalForMongo._mongoClient;
  const db = client.db(process.env.MONGODB_DB || "jbfitnet");

  // One phone number per list.
  if (!globalForMongo._mongoIndexes) {
    globalForMongo._mongoIndexes = Promise.all([
      db.collection("waitlist_members").createIndex({ phone: 1 }, { unique: true }),
      db.collection("waitlist_gyms").createIndex({ phone: 1 }, { unique: true }),
    ])
      .then(() => undefined)
      .catch((err) => {
        globalForMongo._mongoIndexes = undefined;
        throw err;
      });
  }
  await globalForMongo._mongoIndexes;

  return db;
}
