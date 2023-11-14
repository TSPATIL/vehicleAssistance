const { mongoose, model } = require('mongoose');
const { Schema } = mongoose;

const mechanicSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  mName: {
    type: String,
    required: true
  },
  mEmail: {
    type: String,
    required: true,
    unique: true
  },
  mContactNo: {
    type: String,
    required: true
  },
  mAddress: {
    type: String,
    required: true
  },
  mCountry: {
    type: String,
    required: true
  },
  mState: {
    type: String,
    required: true
  },
  mPincode: {
    type: String,
    required: true
  },
  mType: {
    type: String,
    required: true
  },
  mGarageName: {
    type: String,
    required: true
  },
  mGarageEmail: {
    type: String,
    required: true
  },
  mGarageContactNo: {
    type: String,
    required: true
  },
  mGarageAddress: {
    type: String,
    required: true
  },
  mLocation: {
    type: String,
    required: true
  },
  m_status: {
    type: String,
    required: true,
    default: 'waiting for approval'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Mechanic = mongoose.model('mechanic', mechanicSchema);
module.exports = Mechanic;