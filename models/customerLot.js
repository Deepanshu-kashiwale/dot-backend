const mongoose = require("mongoose");

const customerLotSchema = new mongoose.Schema({

  p_code: { type: String, unique: true ,index: true},
  p_name: String,
  mobile: String,
  due_days: Number,

  lots: [
    {
      lot_no: String,
      date: Date,
      lot_pack: String
    }
  ]
});
module.exports = mongoose.model(
  "CustomerLot",
  customerLotSchema
);