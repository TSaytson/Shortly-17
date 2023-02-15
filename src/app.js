import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routers/index.routes.js'
dotenv.config();

const app = express();

app.use(express.json())
.use(cors())
.use(routes);


const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port: ${port}`))