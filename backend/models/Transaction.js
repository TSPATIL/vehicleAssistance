const { mongoose, model } = require('mongoose');
const { Schema } = mongoose;

const transactSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  appoint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'appoint'
  },
  mechanic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mechanic'
  },
  payeeName:{
    type: String,
    required: true
  },
  payeeEmail:{
    type: String,
    required: true
  },
  payeeContactNo:{
    type: String,
    required: true
  },
  payeeAddress:{
    type: String,
    required: true
  },
  payeeCountry:{
    type: String,
    required: true
  },
  payeeState:{
    type: String,
    required: true
  },
  payeePincode:{
    type: String,
    required: true
  },
  t_cost: {
    type: Number,
    required: true,
    default: '0'
  },
  t_status: {
    type: String,
    required: true,
    default: "pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Mechanic = mongoose.model('transaction', transactSchema);
module.exports = Mechanic;