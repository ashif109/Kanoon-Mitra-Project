import { MongoClient } from "mongodb";

const dbname = "kanoon-main";
export const collectiondb = "data";

let cachedClient = null;
let cachedDb = null;

export const connection = async () => {
  const url =
    "mongodb+srv://ashifansari04704_db_user:nLndv2OpwOu4nk5S@project1.6bnf3vi.mongodb.net/?appName=project1";

  if (!url) {
    throw new Error(
      "MONGODB_URL environment variable is missing",
    );
  }
  if (cachedDb) return cachedDb;
  if (!cachedClient) {
    cachedClient = new MongoClient(url);
    await cachedClient.connect();
  }
  cachedDb = cachedClient.db(dbname);
  return cachedDb;
};
