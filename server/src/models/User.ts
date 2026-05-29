import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  level: number;
  xp: number;
  streak: number;
  shieldActive: boolean;
  intellect: number;
  vitality: number;
  creativity: number;
  brainDumpsCompleted: number;
  tasksExtracted: number;
  actionPlansCompleted: number;
  emotionalReflections: number;
  recoveryStepsCompleted: number;
  lastActiveDate: Date;
  activeDaysCount: number;
  hasBouncedBack: boolean;
  claimedBadges: string[];
}

const UserSchema = new Schema<IUser>({
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  shieldActive: { type: Boolean, default: true },
  intellect: { type: Number, default: 0 },
  vitality: { type: Number, default: 0 },
  creativity: { type: Number, default: 0 },
  brainDumpsCompleted: { type: Number, default: 0 },
  tasksExtracted: { type: Number, default: 0 },
  actionPlansCompleted: { type: Number, default: 0 },
  emotionalReflections: { type: Number, default: 0 },
  recoveryStepsCompleted: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: Date.now },
  activeDaysCount: { type: Number, default: 1 },
  hasBouncedBack: { type: Boolean, default: false },
  claimedBadges: { type: [String], default: [] },
});

export default mongoose.model<IUser>('User', UserSchema);
