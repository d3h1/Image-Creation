import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

// Allows us to pull env variables from the dotenv file
dotenv.config();

const app = express();
// Adding additional middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Creating API endpoints that hook onto from front end 
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

// Allows us to get responses and requests
app.get('/', async (req,res) => {
    // Sending a response message to see if we are in the server 
    res.send('Hello from DALL-E')
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'));
    }
    catch (error) {
        console.log(error);
    }
}

startServer();