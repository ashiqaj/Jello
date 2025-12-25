import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messegeRoutes from './routes/messege.route.js';
import path from 'path';

const app = express();
const __dirname = path.resolve();

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messeges", messegeRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on the port " + PORT);
});