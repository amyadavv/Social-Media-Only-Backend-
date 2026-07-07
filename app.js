import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
app.use("/api/user", router)
app.use("/api/blog", blogRouter)

if (!mongoUri) {
    console.error("Missing MONGO_URI in environment variables");
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => app.listen(port))
    .then(() => console.log(`Connected to database and listening on localhost:${port}`))
    .catch((err) => console.log(err));