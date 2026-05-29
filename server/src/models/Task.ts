import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  category: string;
  energyRequired: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'failed' | 'recovering';
  xpReward: number;
  isMicroStep?: boolean;
  recoveryOf?: string;
  description?: string;
  priorityScore?: number;
  priorityLabel?: string;
  urgency?: number;
  importance?: number;
  emotionalWeight?: number;
  deadlineScore?: number;
  deadline?: string;
  dependency?: string;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  energyRequired: { type: String, enum: ['low', 'medium', 'high'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'recovering'], default: 'pending' },
  xpReward: { type: Number, required: true },
  isMicroStep: { type: Boolean, default: false },
  recoveryOf: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  description: { type: String, default: '' },
  priorityScore: { type: Number },
  priorityLabel: { type: String },
  urgency: { type: Number },
  importance: { type: Number },
  emotionalWeight: { type: Number },
  deadlineScore: { type: Number },
  deadline: { type: String },
  dependency: { type: String },
  reason: { type: String },
}, { timestamps: true });

export default mongoose.model<ITask>('Task', TaskSchema);
