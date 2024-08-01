import { Schema, Types } from 'mongoose';
import { Files_DB } from '@/types';

export function FILES_SCHEMA(): Schema<Files_DB> {
	const baseSchema = new Schema<Files_DB>(
		{
			userId: {
				type: Schema.Types.ObjectId,
				ref: 'users',
				required: [true, 'user is requiered to create a task'],
			},
			fileType: {
				type: String,
				enum: ['file', 'folder'],
				required: [true, 'File Type is required'],
			},
			icon: {
				type: String,
				minlength: 2,
				required: [true, 'Icon is required'],
			},
			level: {
				type: String,
				minlength: 2,
				required: [true, 'Level is required'],
			},
			name: {
				type: String,
				minlength: 2,
				required: [true, 'Name is required'],
			},
		},
		{ timestamps: true, discriminatorKey: 'fileType' }
	);

	// Schema for 'file' type
	const fileSchema = new Schema({
		mimeType: {
			type: String,
			enum: ['image', 'audio', 'video', 'doc'],
			required: [true, 'MIME Type is required for files'],
		},
		resource: {
			type: String,
			required: [true, 'Resource is required for files'],
		},
	});

	// Schema for 'folder' type
	const folderSchema = new Schema({
		content: [baseSchema],
	});

	// Add discriminators
	baseSchema.discriminator('file', fileSchema);
	baseSchema.discriminator('folder', folderSchema);

	return baseSchema;
}
