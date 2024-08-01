import { TaskGroup_DB } from '@/types';
import { Schema, Types } from 'mongoose';

export function TASKS_SCHEMA(): Schema<TaskGroup_DB> {
	return new Schema<TaskGroup_DB>(
		{
			userId: {
				type: Schema.Types.ObjectId,
				ref: 'users',
				required: [true, 'user is requiered to create a task'],
			},
			title: {
				type: String,
				minlength: 2,
				required: [true, 'title can not be empty'],
			},
			description: {
				type: String,
				minlength: 2,
				required: [true, 'description can not be empty'],
			},
			subTasks: {
				type: [
					{
						_id: Types.ObjectId,
						task: String,
						tag: {
							type: String,
							enum: ['urgent', 'important', 'must do', 'normal'],
							required: [true, 'sub Task Tag is required'],
						},
						isCompleted: { type: Boolean, default: false },
					},
				],
				default: [],
			},
		},
		{ timestamps: true }
	);
}
