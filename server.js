import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from "cors";
import path from 'path';

//configure env
dotenv.config();
/* 
   * if your .env file in other folder, not in root, then write this way - 
         dotenv.config({path: "../GIVE PATH"});
*/

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use("/api/v1/product", productRoutes);


//for hosting in backend 
app.use('*', function(req, res){
   res.sendFile(path.join(__dirname, './client/build/index.html'));
})

//Port
const PORT = process.env.PORT || 8080; //If is there any issue in process.env.PORT, then take by default 8080

//run listen
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`.bgCyan.white)
});