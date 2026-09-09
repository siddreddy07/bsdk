import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from "express-rate-limit";
import { connectToDb } from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import embedRoutes from './routes/embed.routes.js';
import chatRoutes from './routes/chat.routes.js';
import documentRoutes from './routes/document.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import fileRouter from './routes/file.routes.js';
import knowledgeRoutes from './routes/knowledge.routes.js'
import botRoutes from './routes/bot.routes.js';
import tryRoutes from './routes/try.route.js'


const app = express();

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({
    origin: clientUrl,
    credentials: true,
}));

app.use(express.json());

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,               
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(limiter);

app.use(cookieParser());

app.use(morgan(":method :url :status :response-time ms"));


app.use("/api/auth", authRoutes);
app.use("/api/embed", embedRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/files", fileRouter);
app.use("/api/bots", botRoutes);
app.use("/api/knowledge", knowledgeRoutes);
app.use("/api/try", tryRoutes);


app.get("/",(_req, res) => {
    res.json({
        name:"bsdk API",
        status:"running",
    })
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectToDb()

});