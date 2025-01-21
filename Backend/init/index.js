const mongoose = require("mongoose");
// const initData = require("./data.js");
const aws = require("../models/amazonaws.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/api";

main().then(() =>
{
    console.log("connection successful");
}).catch((err) =>  
{
    console.log(err);
});

async function main()
{
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>
{
    let response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    let data =  await (response).data;
    await aws.deleteMany({});
    await aws.insertMany(data);
    console.log("data was initialized");
};

initDB();