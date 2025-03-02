import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

connectDB();

app.listen(port,() => {
    console.log(`Server is listening on ${port}`);
})

