import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  level: number;
  xp: number;
  streak: number;
  shieldActive: boolean;
  intellect: number;
  vitality: number;
  creativity: number;
}

const UserSchema = new Schema<IUser>({
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  shieldActive: { type: Boolean, default: true },
  intellect: { type: Number, default: 0 },
  vitality: { type: Number, default: 0 },
  creativity: { type: Number, default: 0 },
});

export default mongoose.model<IUser>('User', UserSchema);
