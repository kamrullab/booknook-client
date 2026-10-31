import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/booknook";

const globalForMongo = globalThis as typeof globalThis & {
  bookNookMongoClient?: MongoClient;
};

export const mongoClient = globalForMongo.bookNookMongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.bookNookMongoClient = mongoClient;
}

export const authDatabase = mongoClient.db();
