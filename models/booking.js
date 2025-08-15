

const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing",
    required: true
   },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  checkIn:{
 type:Date,
 required: true,
  },

  checkOut: {
    type:Date,
    requied: true,
  }, 
  totPrice:{
    type:Number,
    requied: true,
  }
});
const Booking = mongoose.model("Booking", bookingSchema);
module.exports= Booking;


