const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({

  foodName: {
    type: String,
    required: true,
  },

  quantity: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  details: {
    type: String,
  },
  image: {
  type: String,
},

  status: {
    type: String,
    default: "Pending",
  },
  verification: {
  type: String,
  default: "Checking",
},

aiScore: {
  type: Number,
  default: 0,
},
acceptedBy: {
  type: String,
  default: "",
},

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model(
  "Donation",
  DonationSchema
);