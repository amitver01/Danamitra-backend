require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
connectDB = require('./config/db');
const donorRoutes = require('./routes/donorRoutes');
const orgRoutes = require('./routes/orgRoutes');
const campaignRoutes = require('./routes/campaignRoutes')
const app=express();

app.use(express.json());
app.use(cors());

connectDB();

app.get('/' , (req , res) => {
    res.send("hello");
})

app.use('/api/donors', donorRoutes);
app.use('/api/org' , orgRoutes)
app.use('/api/campaign' , campaignRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`);
});