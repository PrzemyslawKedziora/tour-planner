import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);

app.listen(PORT, () =>
    console.log(`Server is running on port: http://localhost:${PORT}`)
);
