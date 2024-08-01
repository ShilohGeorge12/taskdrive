// db.ts
import mongoose, { Connection, Model } from 'mongoose';
import type { Files_DB, TaskGroup_DB, USER_DB } from '@/types';
import { env } from '@/env';
import { FILES_SCHEMA } from './schema/files';
import { TASKS_SCHEMA } from './schema/tasks';
import { USER_SCHEMA } from './schema/user';

class Database {
	private static instance: Database;
	private connection!: Connection;
	private filesModel: Model<Files_DB>;
	private tasksModel: Model<TaskGroup_DB>;
	private usersModel: Model<USER_DB>;

	private constructor() {
		this.connect();
		this.filesModel = this.createFileModel();
		this.tasksModel = this.createTaskModel();
		this.usersModel = this.createUserModel();
	}

	private connect() {
		mongoose.set('strictQuery', false);
		this.connection = mongoose.createConnection(env.DATABASE_URL, {
			writeConcern: { w: 'majority' },
			retryWrites: true,
		});

		this.connection.on('error', (error) => {
			if (error instanceof Error) console.error('MongoDB connection error:', error.message);
		});

		this.connection.once('open', () => {
			console.log('Connected to MongoDB');
		});
	}

	private createFileModel(): Model<Files_DB> {
		const filesSchema = FILES_SCHEMA();
		return this.connection.model<Files_DB>('files', filesSchema);
	}

	private createTaskModel(): Model<TaskGroup_DB> {
		const tasksSchema = TASKS_SCHEMA();
		return this.connection.model<TaskGroup_DB>('tasks', tasksSchema);
	}
	private createUserModel(): Model<USER_DB> {
		const usersSchema = USER_SCHEMA();
		return this.connection.model<USER_DB>('users', usersSchema);
	}

	public static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	public getFiles(): Model<Files_DB> {
		return this.filesModel;
	}
	public getTasks(): Model<TaskGroup_DB> {
		return this.tasksModel;
	}
	public getUsers(): Model<USER_DB> {
		return this.usersModel;
	}
}

export const MongoDB = Database.getInstance();
