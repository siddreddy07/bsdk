import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "MONGODB_URI is not defined in the environment variables"
  );
}

declare global {
  var mongoClient: MongoClient | undefined;
}

const client =
  global.mongoClient || new MongoClient(uri);

if (!global.mongoClient) {
  global.mongoClient = client;
}

export const db = client.db(
  process.env.MONGODB_DB || "bsdk"
);

export async function connectToDb() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}