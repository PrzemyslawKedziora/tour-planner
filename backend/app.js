import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5000;
const MONGODB_URI = process.env.DB_ADDRESS;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(cors());
app.use("/", routes);
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('db connected');
    app.listen(PORT, () =>
        console.log(`Server is running on port: http://localhost:${PORT}`)
    );
}).catch((e)=>{
    console.log('cannot connect with database',e);
})

