const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./review.js");

const reviewSchema = new Schema({
    body:{
        type:String,
        required:true
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
       type: Date,
       default: Date.now(),
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Review", reviewSchema); 