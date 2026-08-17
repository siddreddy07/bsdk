import express from 'express';
import cors from 'cors';
import { connectToDb } from './config/db.js';


const app = express();


app.use(cors());

app.use(express.json());


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