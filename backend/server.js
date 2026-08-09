import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import axios from "axios";
import process from "process";
import {ObjectId} from "mongodb"
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "./dbconfig.js";
import { collectiondb, connection } from "./dbconfig.js";


// import { collectiondb, connection } from "./dbconfig";

const app = express();
app.use((req, res, next) => {
  if (req.url && req.url.includes("//")) {
    req.url = req.url.replace(/\/+/g, "/");
  }
  next();
});

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res)=>{
res.send("<h1>heyyy backend running....</h1>");

});

app.post("/sign-in", async(req, res)=>{
  try{
    const userdata = req.body;
    if(userdata.email && userdata.password){
      const db = await connection();
      const collection = db.collection("users");
      const existinguser= await collection.findOne({email: userdata.email});
      if(existinguser){
         return res.status(400).json({ success: false, msg: "User already exists" });
      }
      const result = await collection.insertOne(req.body);
      if (result) {
              jwt.sign(
                {
                  id: result.insertedId,
                  email: userdata.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: "10d" },
                (error, token) => {
                  if (error) {
                    return res.status(500).json({ success: false, msg: "Token generation failed" });
                  }
      
                  res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 10 * 24 * 60 * 60 * 1000,
                  });
      
                  return res.json({ success: true, msg: "signup done", token });
                }
              );
            }
          else{
               return res.json({success:false, message:"sing-in failed" });
          }
          } else return res.status(400).json({success:false, message:"email and password are require..."});
  
      } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, msg: err.message });
  }
});
app.post("/lawyer-register", async(req, res)=>{
  try{
  const lawyerdata = req.body;
  if(lawyerdata.email && lawyerdata.password){
    const db = await connection();
    const collection  = db.collection("lawyers");
    const existinglawyer = await collection.findOne({email:lawyerdata.email});
    if(existinglawyer){
      return res.status(400).json({success:false, message:"Lawyer already exist"})
    }
    const result = await collection.insertOne(req.body)
    if(result){
      jwt.sign({
     id: result.insertedId,
     email: lawyerdata.email,
      },
      process.env.JWT_SECRET,
      {expiresIn:"10d"},
        (error, token) => {
                  if (error) {
                    return res.status(500).json({ success: false, msg: "Token generation failed" });
                  }
                   res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 10 * 24 * 60 * 60 * 1000,
                  });
                    return res.json({ success: true, msg: "signup done", token });
                }
              );
            }
          else{
               return res.json({success:false, message:"sing-in failed" });
          }
          } else return res.status(400).json({success:false, message:"email and password are require..."});
  
      } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, msg: err.message });
  }
});


app.post("/lawyer-login", async(req, res)=>{
  try{
    const lawyerdata = req.body;
    if(lawyerdata.email && lawyerdata.password){
      const db = await connection();
      const collection = db.collection("lawyers");
      const result = await collection.findOne({
        email:lawyerdata.email,
        password:lawyerdata.password
      })
         const lawyer = await collection.findOne({
      email: lawyerdata.email
    });

    if (!lawyer) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    
    
    if (lawyer.password !== lawyerdata.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }
         if(result){
             jwt.sign(
        {
          id: result._id,
          email: result.email,
              },
              process.env.JWT_SECRET,
              {expiresIn:"10d"},
              (err, token)=>{
                if (err) {
              return res.status(500).json({ success: false, msg: "JWT signing error" });
            }
             res.cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
              maxAge: 10 * 24 * 60 * 60 * 1000,
            });
              return res.json({
                success:true, 
                message:"login successfull", token
              })
              }
            )
         }else return res.json({success:false, message:"lawyer not found..."})
    }else return res.json({success:false,message:"email and password require" })

  } catch(err){ 
    console.log(err);
    return res.status(500).json({success:false, message:err})
  }
});

app.post("/user-login", async(req, res)=>{
  try{
    const userdata= req.body;
    if(userdata.email && userdata.password){
  const db = await connection();
    const collection = db.collection("users");
    const result = await collection.findOne({
      email: userdata.email,
      password:userdata.password
    })
    if(result){
      jwt.sign(
        {
          id: result._id,
          email: result.email,
        },
        process.env.JWT_SECRET,
        (err, token) => {
          if (err) {
            return res.status(500).json({ success: false, msg: "JWT signing error" });
          }
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 10 * 24 * 60 * 60 * 1000,
          });
          return res.json({success:true, message:"user login successfull...", token});
        }
      );
    } else {
      return res.status(401).json({success:false, message:"user not found..."});
    }
    } else return res.status(400).json({success:false, message:"email and password require"})
  
  } catch(err){
    console.log(err)
   return  res.status(500).json({success:false, message:"login failed..."})
  }
})
app.get("/api/legal-news", async (req, res) => {
  try {
    const response = await axios.get("https://newsdata.io/api/1/latest", {
      params: {
        apikey: process.env.NEWSDATA_API_KEY,
        q: "Legal News India",
        country: "in",
        language: "en",
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
app.post("/AskLawyer", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection("legalQuestions");

    const result = await collection.insertOne({
      ...req.body,

      userId: req.user.id,

      answer: "",
      status: "pending",
      lawyerId: null,
      lawyerName: null,

      serviceType: "ASK_A_LAWYER",

      createdAt: new Date()
    });

    return res.json({
      success: true,
      insertedId: result.insertedId
    });

  } catch (err) {
    console.log("Ask Lawyer Error:", err);

    return res.status(500).json({
      success: false,
      msg: err.message
    });
  }
});
app.put("/update-task", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(collectiondb);
    const { _id, ...fields } = req.body;

    const result = await collection.updateOne(
      {
        _id: new ObjectId(_id),
        userId: req.user.id,
      },
      { $set: fields }
    );

    return res.json(result);
  } catch (err) {
    console.error("Update task error:", err);
    return res.status(500).json({ success: false, msg: err.message });
  }
});

app.get("/Dashboard", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection("legalQuestions");

    const result = await collection
      .find({
        userId: req.user.id,
      })
      .sort({ createdAt: -1 })
      .toArray();

    const formatted = result.map((q) => {
      const st = q.status ? q.status.toString().toLowerCase() : "pending";
      let statusFormatted = "Pending Review";
      if (st === "answered" || st === "completed" || st === "solved") statusFormatted = "Answered";
      else if (st === "accepted") statusFormatted = "Accepted";
      else if (st === "in_progress" || st === "in progress") statusFormatted = "In Progress";
      else if (st === "declined") statusFormatted = "Declined";

      return {
        _id: q._id,
        id: q._id.toString(),
        title: q.title || q.subject || "Legal Consultation Request",
        description: q.question || q.description || q.details || "No question details provided",
        category: q.category || q.legalCategory || "General Law",
        urgency: q.urgency || "medium",
        status: statusFormatted,
        rawStatus: q.status || "pending",
        date: q.createdAt ? new Date(q.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        time: q.createdAt ? new Date(q.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "10:00 AM",
        answerText: q.answer || "",
        advocateName: q.lawyerName || "Assigned Advocate",
        advocateBar: "Bar Verified Advocate",
        replies: q.replies || (q.answer ? [{ name: q.lawyerName || "Advocate", date: new Date().toLocaleString("en-IN"), text: q.answer, sender: "lawyer" }] : []),
        serviceType: q.serviceType || "ASK_A_LAWYER",
      };
    });

    return res.json(formatted);

  } catch (err) {
    console.error("Dashboard ERROR:", err);

    return res.status(500).json({
      success: false,
      msg: err.message
    });
  }
});

app.get("/update/:id", verifyJWTToken, async (req, res) => {
  try {
    const id = req.params.id;
    const db = await connection();
    const collection = db.collection(collectiondb);

    const result = await collection.findOne({ _id: new ObjectId(id) });
    return res.json(result);
  } catch (err) {
    console.error("Fetch single task error:", err);
    return res.status(500).json({ success: false, msg: err.message });
  }
});

app.get("/profile", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection("users");

    const user = await collection.findOne(
      {
        _id: new ObjectId(req.user.id)
      },
      {
        projection: {
          password: 0
        }
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      user
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

app.put("/profile", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection("users");
    const { _id, password, ...updateFields } = req.body;

    await collection.updateOne(
      { _id: new ObjectId(req.user.id) },
      { $set: updateFields }
    );

    const updatedUser = await collection.findOne(
      { _id: new ObjectId(req.user.id) },
      { projection: { password: 0 } }
    );

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ---------------- USER DOCUMENT WALLET ENDPOINTS ----------------

app.get("/user/documents", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection("userDocuments");
    const docs = await collection.find({ userId: req.user.id }).sort({ createdAt: -1 }).toArray();

    const formatted = docs.map((d) => ({
      id: d._id.toString(),
      name: d.name || d.title || "Legal Document",
      category: d.category || "General",
      type: d.type || "PDF",
      size: d.size || "1.2 MB",
      date: d.date || (d.createdAt ? new Date(d.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]),
      fileData: d.fileData || null,
      content: d.content || "Uploaded document file stored in secure vault."
    }));

    return res.json({ success: true, documents: formatted });
  } catch (err) {
    console.error("Fetch user documents error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/user/documents", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection("userDocuments");
    const newDoc = {
      ...req.body,
      userId: req.user.id,
      createdAt: new Date()
    };
    const result = await collection.insertOne(newDoc);
    return res.json({
      success: true,
      message: "Document uploaded to vault",
      insertedId: result.insertedId
    });
  } catch (err) {
    console.error("Upload user document error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.put("/user/documents/:id", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection("userDocuments");
    const { name, category } = req.body;
    let filter;
    try {
      filter = { _id: new ObjectId(req.params.id), userId: req.user.id };
    } catch (e) {
      filter = { _id: req.params.id, userId: req.user.id };
    }
    await collection.updateOne(filter, { $set: { name, category, updatedAt: new Date() } });
    return res.json({ success: true, message: "Document updated" });
  } catch (err) {
    console.error("Update user document error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.delete("/user/documents/:id", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection("userDocuments");
    let filter;
    try {
      filter = { _id: new ObjectId(req.params.id), userId: req.user.id };
    } catch (e) {
      filter = { _id: req.params.id, userId: req.user.id };
    }
    await collection.deleteOne(filter);
    return res.json({ success: true, message: "Document deleted" });
  } catch (err) {
    console.error("Delete user document error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ---------------- LIVE LEGAL NEWS API (NEWSDATA.IO) ----------------

app.get("/api/legal-news", async (req, res) => {
  try {
    const apiKey = (process.env.NEWSDATA_API_KEY || "pub_925214956b0b420da2b0a1d54be08785").trim();
    const newsUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=Legal%20News%20India&country=in&language=hi,en&category=crime,education,politics&timezone=Asia/Kolkata&removeduplicate=1`;

    const response = await axios.get(newsUrl);
    return res.json(response.data);
  } catch (err) {
    console.error("Fetch NewsData error:", err?.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: err?.response?.data?.message || err.message,
      results: []
    });
  }
});

app.post("/Contact", verifyJWTToken, async (req, res) => {
  try{
  const db  = await connection();
  const collection  = db.collection("ContactsDetails");
  const result = await collection.insertOne({
  ...req.body,
  userId: req.user.id
});
  return res.json(result);
  } catch(err){
    console.log(err);
  }
})
app.post(
  "/legal-consultation",
  verifyJWTToken,
  async (req, res) => {
    try {

      console.log("JWT USER:", req.user);
      console.log("FORM DATA:", req.body);

      const db = await connection();
      const collection = db.collection("legalQuestions");

      const result = await collection.insertOne({
        ...req.body,

        userId: req.user.id,
        answer: "",
        status: "pending",
        lawyerId: null,
        lawyerName: null,

        createdAt: new Date()
      });

      return res.json({
        success: true,
        message: "Consultation submitted successfully",
        insertedId: result.insertedId
      });

    } catch (err) {
      console.log("LEGAL CONSULTATION ERROR:", err);

      return res.status(500).json({
        success: false,
        msg: err.message
      });
    }
  }
);
app.post("/services/fir-guidance",verifyJWTToken, async(req, res)=>{
  try{
  const db = await connection();
  const collection = db.collection("services");
  const result = await collection.insertOne({...req.body, userId: req.user.id});
  return res.json(result);
  }catch(err){
    console.log(err);
  }

})
app.post("/services/rti-filing",verifyJWTToken, async(req, res)=>{
  try{
    const db = await connection();
    const collection  = db.collection("services");
    const result = await collection.insertOne({...req.body, userId: req.user.id});
    return res.json(result);
  }
  catch(err){  console.log(err);
  }
})
app.post("/services/cyber-complaint",verifyJWTToken, async(req, res)=>{
  try{
  const db = await connection();
  const collection  = db.collection("services");
  const result = await collection.insertOne({...req.body, userId: req.user.id});
  return res.json(result);
  } catch(err){
    console.log(err);
  }
})
app.post("/services/lawyer-connect",verifyJWTToken, async(req, res)=>{
  try{
  const db = await connection();
  const collection = db.collection("services");
  const result = await collection.insertOne({ ...req.body, userId: req.user.id});
  return res.json(result);
  }catch(err){
    console.log(err);
    return res.status(500).json({ success: false, msg: err.message });
  }

})
 app.get("/services/lawyer-connect", async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection("lawyers");

    const lawyers = await collection
      .find(
        {},
        {
          projection: {
            password: 0
          }
        }
      )
      .toArray();

    return res.json({
      success: true,
      lawyers
    });

  } catch (err) {
    console.log("Lawyer fetch error:", err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// ---------------- ADVOCATE DASHBOARD BACKEND API ENDPOINTS ----------------

app.get("/lawyer/profile", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection("lawyers");
    const lawyer = await collection.findOne(
      { _id: new ObjectId(req.user.id) },
      { projection: { password: 0 } }
    );

    if (!lawyer) {
      return res.status(404).json({
        success: false,
        message: "Lawyer profile not found"
      });
    }

    return res.json({
      success: true,
      lawyer
    });
  } catch (err) {
    console.error("Fetch lawyer profile error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.put("/lawyer/profile", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection("lawyers");
    const { _id, password, ...updateData } = req.body;

    await collection.updateOne(
      { _id: new ObjectId(req.user.id) },
      { $set: updateData }
    );

    const updatedLawyer = await collection.findOne(
      { _id: new ObjectId(req.user.id) },
      { projection: { password: 0 } }
    );

    return res.json({
      success: true,
      message: "Profile updated successfully",
      lawyer: updatedLawyer
    });
  } catch (err) {
    console.error("Update lawyer profile error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/lawyer/queries", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const questionsColl = db.collection("legalQuestions");
    const servicesColl = db.collection("services");

    const questions = await questionsColl.find({}).sort({ createdAt: -1 }).toArray();
    const services = await servicesColl.find({}).sort({ createdAt: -1 }).toArray();

    const normalizeStatus = (st) => {
      if (!st) return "Pending Review";
      const s = st.toString().toLowerCase();
      if (s === "pending" || s === "pending review") return "Pending Review";
      if (s === "accepted") return "Accepted";
      if (s === "in_progress" || s === "in progress") return "In Progress";
      if (s === "scheduled") return "Scheduled";
      if (s === "completed" || s === "answered" || s === "solved") return "Completed";
      if (s === "declined" || s === "rejected") return "Declined";
      return st;
    };

    const normalizeUrgency = (urg) => {
      if (!urg) return "Medium";
      const u = urg.toString().toLowerCase();
      if (u === "high") return "High";
      if (u === "low") return "Low";
      return "Medium";
    };

    const formatServiceType = (st) => {
      if (!st) return "Ask a Lawyer";
      if (st === "ASK_A_LAWYER") return "Ask a Lawyer";
      if (st === "LEGAL_CONSULTATION") return "Legal Consultation";
      if (st === "LAWYER_CONNECT") return "Lawyer Connect";
      if (st === "FIR_GUIDANCE") return "FIR Guidance";
      if (st === "RTI_FILING") return "RTI Filing";
      if (st === "CYBER_COMPLAINT") return "Cyber Complaint";
      return st;
    };

    const formattedQuestions = questions.map((q) => ({
      id: q._id ? q._id.toString() : "",
      clientName: q.fullName || q.name || q.clientName || "Citizen User",
      clientEmail: q.email || q.clientEmail || "N/A",
      clientPhone: q.phone || q.clientPhone || "N/A",
      city: q.city || "New Delhi",
      sourceService: formatServiceType(q.serviceType || q.service),
      category: q.category || q.legalCategory || "General Law",
      subject: q.title || q.subject || q.topic || q.issueType || "Legal Inquiry",
      description: q.question || q.description || q.details || "No details provided",
      urgency: normalizeUrgency(q.urgency),
      status: normalizeStatus(q.status),
      rawStatus: q.status || "pending",
      date: q.createdAt ? new Date(q.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      time: q.createdAt ? new Date(q.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "10:00 AM",
      fee: q.fee ? (q.fee.toString().startsWith("₹") ? q.fee : `₹${q.fee}`) : "₹1,000",
      paymentStatus: q.paymentStatus || "Paid to Escrow",
      documents: q.documents || [],
      replies: q.replies || (q.answer ? [{ lawyer: q.lawyerName || "Advocate", date: new Date().toLocaleString("en-IN"), text: q.answer }] : []),
    }));

    const formattedServices = services.map((s) => ({
      id: s._id ? s._id.toString() : "",
      clientName: s.fullName || s.name || "Citizen User",
      clientEmail: s.email || "N/A",
      clientPhone: s.phone || "N/A",
      city: s.city || "New Delhi",
      sourceService: formatServiceType(s.serviceType || "Service Request"),
      category: s.category || "Legal Service",
      subject: s.subject || s.serviceType || "Service Guidance Request",
      description: s.description || s.details || s.question || "Service guidance application",
      urgency: normalizeUrgency(s.urgency),
      status: normalizeStatus(s.status),
      rawStatus: s.status || "pending",
      date: s.createdAt ? new Date(s.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      time: s.createdAt ? new Date(s.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "11:00 AM",
      fee: s.fee ? `₹${s.fee}` : "₹1,200",
      paymentStatus: "Paid to Escrow",
      documents: s.documents || [],
      replies: s.replies || [],
    }));

    const combined = [...formattedQuestions, ...formattedServices];

    return res.json({
      success: true,
      queries: combined
    });
  } catch (err) {
    console.error("Fetch lawyer queries error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.put("/lawyer/queries/:id", verifyJWTToken, async (req, res) => {
  try {
    const queryId = req.params.id;
    const { status, reply, quotedFee } = req.body;
    const db = await connection();
    const questionsColl = db.collection("legalQuestions");
    const servicesColl = db.collection("services");

    const updateFields = {};
    if (status) updateFields.status = status;
    if (quotedFee) updateFields.quotedFee = quotedFee;

    let filter;
    try {
      filter = { _id: new ObjectId(queryId) };
    } catch (e) {
      filter = { _id: queryId };
    }

    let lawyerName = "Advocate";
    try {
      const lawyerDoc = await db.collection("lawyers").findOne({ _id: new ObjectId(req.user.id) });
      if (lawyerDoc && (lawyerDoc.fullName || lawyerDoc.name)) {
        lawyerName = lawyerDoc.fullName || lawyerDoc.name;
      }
    } catch (e) {}

    let updateOperation = { $set: updateFields };
    if (reply) {
      const newReplyObj = {
        lawyer: lawyerName,
        lawyerId: req.user.id,
        date: new Date().toLocaleString("en-IN"),
        text: reply,
        quotedFee: quotedFee ? (quotedFee.toString().startsWith("₹") ? quotedFee : `₹${quotedFee}`) : null,
      };
      updateOperation.$push = { replies: newReplyObj };
      updateOperation.$set.answer = reply;
      updateOperation.$set.lawyerId = req.user.id;
      updateOperation.$set.lawyerName = lawyerName;
    }

    let result = await questionsColl.updateOne(filter, updateOperation);
    if (result.matchedCount === 0) {
      result = await servicesColl.updateOne(filter, updateOperation);
    }

    return res.json({
      success: true,
      message: "Query updated successfully"
    });
  } catch (err) {
    console.error("Update lawyer query error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});
function verifyJWTToken(req, res, next) {
   let token = req.cookies?.token;

if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token Missing",
    });
  }
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    req.user = decoded;
    next();
  });
}
const PORT = process.env.PORT || 3400;
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

