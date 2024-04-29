import express from 'express';
import bodyParser from 'body-parser';
import router from "./routes/index.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(PORT, () =>
    console.log(`Server is running on port: http://localhost:${PORT}`)
);
