const { mongoose, model } = require('mongoose');
const { Schema } = mongoose;

const appointSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  vOwnerName: {
    type: String,
    required: true
  },
  vOwnerEmail: {
    type: String,
    required: true
  },
  vOwnerContactNo: {
    type: String,
    required: true
  },
  vOwnerAddress: {
    type: String,
    required: true
  },
  vOwnerCountry: {
    type: String,
    required: true
  },
  vOwnerState: {
    type: String,
    required: true
  },
  vOwnerPincode: {
    type: String,
    required: true
  },
  vDriverName: {
    type: String,
    required: true
  },
  vDriverEmail: {
    type: String,
    required: true
  },
  vDriverContactNo: {
    type: String,
    required: true
  },
  vType: {
    type: String,
    required: true
  },
  vName: {
    type: String,
    required: true
  },
  vCompany: {
    type: String,
    required: true
  },
  vRegisteredNo: {
    type: String,
    required: true
  },
  vPickLocation: {
    type: String,
    required: true
  },
  omcomment: {
    type: String,
    required: false,
  },
  mechanic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mechanic'
  },
  a_status: {
    type: String,
    required: true,
    default: 'waiting for approval'
  },
  t_cost: {
    type: Number,
    required: true,
    default: '0'
  },
  t_status: {
    type: String,
    required: true,
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Appoint = mongoose.model('appoint', appointSchema);
module.exports = Appoint;