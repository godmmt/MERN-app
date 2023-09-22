import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    minLength: 6,
    maxLength: 320,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const SubscriberModel = mongoose.model('Subscriber', subscriberSchema);

export default SubscriberModel;
