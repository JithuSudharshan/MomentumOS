import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  category: string;
  energyRequired: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'failed' | 'recovering';
  xpReward: number;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  energyRequired: { type: String, enum: ['low', 'medium', 'high'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'recovering'], default: 'pending' },
  xpReward: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<ITask>('Task', TaskSchema);
