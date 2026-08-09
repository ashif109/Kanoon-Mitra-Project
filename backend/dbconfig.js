import dns from "node:dns";
import process from "node:process";


dns.setServers(["8.8.8.8", "1.1.1.1"]);

import { MongoClient } from "mongodb";

const dbname = "kanoon-main";
export const collectiondb = "data";

let client;
let db;

export async function connection() {
  if (db) return db;

  const url = process.env.MONGODB_URL;
    

  client = new MongoClient(url, {
    serverSelectionTimeoutMS: 10000,
  });

  await client.connect();

  db = client.db(dbname);

  console.log("✅ MongoDB Connected");

  return db;
}