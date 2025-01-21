const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const aws = require("./models/amazonaws.js");
const axios = require("axios");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const cors = require('cors');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
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
    // let response = axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    // .then((response) => {  
    //     let data = response.data;   
    //     res.render("home.ejs",{data:data});
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         });

      const searchQuery = req.query.search;
      const month = req.query.month;
      console.log(req.query);
      let query = {};
    
      if (searchQuery) {
        query = {
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } }
          ]
        };
      }
    
      const transactions = await aws.find(query);
      res.json(transactions);
})