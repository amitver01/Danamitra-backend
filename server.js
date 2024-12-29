require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
connectDB = require('./config/db');
const donorRoutes = require('./routes/donorRoutes');
const orgRoutes = require('./routes/orgRoutes');
const campaignRoutes = require('./routes/campaignRoutes')
const paymentRoutes = require('./routes/paymentRoutes');
const cookieParser = require('cookie-parser');
const app=express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'https://danmitra.vercel.app/', // replace with your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
app.use(cors(corsOptions));
connectDB();

app.get('/' , (req , res) => {
    res.send("hello backend");
})

app.use('/api/donors', donorRoutes);
app.use('/api/org' , orgRoutes)
app.use('/api/campaign' , campaignRoutes)
app.use('/api/payment' , paymentRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`);
});