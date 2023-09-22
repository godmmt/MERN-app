import mongoose, { Schema } from 'mongoose';

const ResetPasswordTokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 5, // 5 minutes
    required: true,
  },
});

const ResetPasswordTokenModel = mongoose.model('ResetPasswordToken', ResetPasswordTokenSchema);

export default ResetPasswordTokenModel;
