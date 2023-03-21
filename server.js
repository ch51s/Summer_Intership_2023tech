import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

//config env
dotenv.config();

//database config and connect
connectDB();

//rest objece
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);

//creating rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce </h1>");
    
} ) ;

//PORT
const PORT = process.env.PORT || 8080;

//run the program
app.listen(PORT, () => {
    console.log('Server running on 8080');
})

