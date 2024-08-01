import { USER_DB } from '@/types';
import { Schema } from 'mongoose';

export function USER_SCHEMA(): Schema<USER_DB> {
	return new Schema<USER_DB>({
		firstname: {
			type: String,
			minlength: 2,
			required: [true, 'firstname can not be empty'],
		},
		lastname: {
			type: String,
			minlength: 2,
			required: [true, 'lastname can not be empty'],
		},
		password: {
			type: String,
			minlength: 6,
			required: [true, 'Password Can not be empty'],
		},
		email: {
			type: String,
			minlength: 2,
			unique: true,
			required: [true, 'Email can not be empty'],
		},
	});
}
