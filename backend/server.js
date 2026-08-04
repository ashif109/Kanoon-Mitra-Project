import express from "express";
import morgan from "morgan";
import cors from "cors";
// import {objectId} from "mongodb"
// import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { collectiondb, connection } from "./dbconfig";
// import { collectiondb, connection } from "./dbconfig";

const app = express();
app.use(
    cors({
        origin:true,
        credentials:true,
        methods:["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders:["Content-Type", "Authorization"],
    })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.get("/", (req, res)=>{
res.send("<h1>heyyy backend running....</h1>");

});

app.post("/", async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(collectiondb);
    const task = {
      ...req.body,
      userId: req.user.id,
    };

    const result = await collection.insertOne(task);
    return res.json(result);
  } catch (err) {
    console.error("Add task error:", err);
    return res.status(500).json({ success: false, msg: err.message });
  }
});
app.listen(3400, ()=>{
    console.log("server is running on http://localhost:3400/")
})

