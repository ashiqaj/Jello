import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messegeRoutes from './routes/messege.route.js'
const app = express();
dotenv.config();
app.use("/api/auth",authRoutes);
app.use("/api/messeges",messegeRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{ console.log("Server is running on the port " +PORT)});