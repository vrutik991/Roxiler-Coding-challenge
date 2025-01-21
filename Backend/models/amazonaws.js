const mongoose = require("mongoose");
const { Schema } = mongoose;

const amazonawsSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true  
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    category:{
        type:String,
    },
    image:{
        type:String,
    },
    sold:{
        type:Boolean
    },
    dateOfSale:{
        type:Date
    }
});

const aws = mongoose.model("aws",amazonawsSchema);

module.exports = aws;