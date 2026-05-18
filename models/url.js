//first we will import the mongoose here
const mongoose = require("mongoose");

//now create the urlSchema

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    //we also want to store the total clicks
    visitHistory: [
      {
        timeStamp: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);


const URL = mongoose.model('url', urlSchema) // it made is plural and also did lowercasing


module.exports = URL;
