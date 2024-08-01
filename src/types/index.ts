import { Types } from 'mongoose';

export interface USER_DB extends USER {
	_id: Types.ObjectId;
	password: string;
}

export interface USER {
	firstname: string;
	lastname: string;
	email: string;
}

export interface TaskGroup_DB extends TaskGroup {
	userId: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}
export interface TaskGroup {
	_id: Types.ObjectId;
	title: string;
	description: string;
	subTasks: SubTask[];
}

export type TAG = 'urgent' | 'important' | 'must do' | 'normal';

export interface SubTask {
	_id: Types.ObjectId;
	task: string;
	tag: TAG;
	isCompleted: boolean;
}

export interface BaseFile_DB extends BaseFile {
	createdAt: Date;
	updatedAt: Date;
}

export interface BaseFile {
	userId: Types.ObjectId;
	_id: string;
	level: string;
	name: string;
	icon: string;
}

export interface FileType extends BaseFile_DB {
	fileType: 'file';
	mimeType: 'image' | 'audio' | 'video' | 'doc';
	resource: string;
}

export interface Folder extends BaseFile {
	fileType: 'folder';
	content: (FileType | Folder)[];
}

export type Files_DB = FileType | Folder;

export type sessionType = {
	user: {
		_id: string;
		firstname: USER['firstname'];
		lastname: USER['lastname'];
		email: string;
	};
	expires: Date;
	iat: any;
	exp: any;
};

export type loginDetails = {
	_id: string;
	firstname: USER['firstname'];
	lastname: USER['lastname'];
	email: string;
};

// Context Types
export type stateAction = { type: 'menu_open' };

export interface State {}

export interface Icontext {
	state: State;
}

export type ReducerType = (state: State, action: stateAction) => State;

// Validatation Regex
export const PASSWORD_REGEX = /^[a-zA-Z0-9@_-\s]{6,24}$/;
export const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/;
export const NAME_REGEX = /^[a-zA-Z\s]{2,}$/;
export const TITLE_REGEX = /^[a-zA-Z\d\s/]{2,}$/;
export const DESCRIPTION_REGEX = /^[a-zA-Z\d\s,.]{2,}$/;
export const CODE_REGEX = /^[0-9]{6}$/;
export const PASSWORD_FORMAT_MESSAGE = `Password must be 6-24 characters long and can only contain letters, numbers, @, _, or -.`;
export const INVALID_EMAIL_MESSAGE = 'Please Verify You Entered A Valid Email Address';

// Actions Types
export interface SignUpType {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

// Type Guards
type fileClient = Omit<Files_DB, 'updatedAt' | 'createdAt' | '_id'> & { _id: string };
export const isFile = (arg: Files_DB): arg is FileType => (arg as FileType).mimeType !== undefined;
export const isFolder = (arg: Files_DB): arg is Folder => (arg as Folder).content !== undefined;
export const isFileClient = (arg: fileClient): arg is FileType => (arg as FileType).mimeType !== undefined;
export const isFolderClient = (arg: fileClient): arg is Folder => (arg as Folder).content !== undefined;
