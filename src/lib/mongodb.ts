import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI!;

const options = { maxPoolSize: 10 };

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

// 单例模式
const clientPromise: Promise<MongoClient> =
  global._mongoClientPromise ||
  (() => {
    const client = new MongoClient(url, options);
    return (global._mongoClientPromise = client.connect());
  })();

export default clientPromise;
