const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const aws = require("./models/amazonaws.js");
const cors = require('cors');

app.use(express.urlencoded({extended:true}));
app.use(cors({ origin: 'http://localhost:5173' }));

async function main()
{
    await mongoose.connect(process.env.MONGO_URL);
}

main().then(()=>
{
    console.log("connection successful");
}).catch((err) =>{
    console.log(err);
});

app.listen(process.env.PORT,(req,res) =>
{
    console.log("root");
})

app.get("/transactions",async (req,res) =>
{   

      const searchQuery = req.query.search;
      const {month , year} = req.query;
      let query = {};
    
      if (searchQuery) {

        query.$or =  [
            { title: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } }
          ]
      }

      if (month) {
        const monthIndex = new Date(Date.parse(month + " 1 ", year)).getMonth(); // Convert month to index (0-based)
        query.dateOfSale = {
            $gte: new Date(year, monthIndex, 1),  // Start of the month
            $lt: new Date(year, monthIndex + 1, 1) // Start of next month
        };
    }
    try{
      const transactions = await aws.find(query);
      res.json(transactions);
    } catch(error)
    {
      console.error("Error fetching transactions:",error);
      res.status(500).json({error:"Internal Server Error"});
    }
})