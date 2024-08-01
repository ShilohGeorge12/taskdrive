'use server';

import { MongoDB } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { TaskGroup, SubTask, isFolder, SignUpType } from '@/types';
import { backendClient } from '@/lib/edgestore/server';
import { Types } from 'mongoose';
import { login, logout } from '@/lib/sessions';

export const onLogin = async ({ email, password }: { email: string; password: string }) => {
	try {
		const user = await MongoDB.getUsers().findOne({ email, password });

		if (!user) {
			return 'Invalid Login Credentials';
		}

		await login({
			_id: user._id.toString(),
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
		});

		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const onLogout = async () => {
	try {
		await logout();
		redirect('/');
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const onSignUp = async ({ firstname, lastname, email, password }: SignUpType) => {
	try {
		await MongoDB.getUsers().create({
			firstname,
			lastname,
			email,
			password,
		});

		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const onForgetPasswordAction = async ({ email }: { email: string }) => {
	try {
		const user = await MongoDB.getUsers().findOne({ email });

		if (!user) {
			return 'user with email was not found';
		}

		return { email };
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const onConfirmCodeAction = async ({ code, email }: { code: string; email: string }) => {
	try {
		// check if email exist
		if (!email) {
			return 'email was not found';
		}

		const defaultCode = '001243';

		if (code !== defaultCode) {
			return 'code was invalid';
		}

		return { email };
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const onResetPassword = async ({ email, password }: { password: string; email: string }) => {
	try {
		const user = await MongoDB.getUsers().findOne({ email, password });

		if (!user) {
			return 'Invalid Login Credentials';
		}

		if (user.password !== password) {
			user.password = password;
		}

		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const onDeleteTask = async ({ taskId, subTaskId }: { taskId: string; subTaskId: string }) => {
	try {
		const task = await MongoDB.getTasks().findOne({ _id: taskId });
		if (!task) {
			return 'task was not found';
		}

		task.subTasks = task.subTasks.filter((subTask) => subTask._id.toString() !== subTaskId);
		await task.save();

		revalidatePath(`/dashboard/${taskId}`);
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const onCompleteTask = async ({ taskId, subTaskId }: { taskId: string; subTaskId: string }) => {
	try {
		const task = await MongoDB.getTasks().findOne({ _id: taskId });
		if (!task) {
			return 'task was not found';
		}

		task.subTasks.forEach((subTask) => {
			if (subTask._id.toString() === subTaskId) {
				subTask.isCompleted = !subTask.isCompleted;
			}
		});

		await task.save();
		revalidatePath(`/dashboard/${taskId}`);
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const onCreateNewTask = async ({ title, description, userId }: Pick<TaskGroup, 'title' | 'description'> & { userId: string }) => {
	try {
		const user = await MongoDB.getUsers().findOne({ _id: userId });
		if (!user) {
			return 'user not found';
		}

		await MongoDB.getTasks().create({
			userId: user._id,
			title,
			description,
			subTasks: [],
		});

		revalidatePath(`/dashboard`);
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const deleteTaskGroup = async ({ _id }: { _id: string }) => {
	try {
		const task = await MongoDB.getTasks().findOne({ _id });

		if (!task) return 'task not found';

		await task.deleteOne();
		revalidatePath('/dashboard');
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const onEditSubTask = async ({ taskId, subTaskId, newSubTask }: { taskId: string; subTaskId: string; newSubTask: string }) => {
	try {
		const task = await MongoDB.getTasks().findOne({ _id: taskId });
		if (!task) {
			return 'task was not found';
		}

		task.subTasks.forEach((subTask) => {
			if (subTask._id.toString() === subTaskId) {
				subTask.task = newSubTask;
			}
		});
		await task.save();
		revalidatePath(`/dashboard/${taskId}`);
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const onAddSubTask = async ({ _id, tag, data }: { _id: string; tag: SubTask['tag']; data: FormData }) => {
	try {
		const subTasksFormData_0 = data.get('0') as string | null;
		const subTasksFormData_1 = data.get('1') as string | null;
		const subTasksFormData_2 = data.get('2') as string | null;

		const taskGroup = await MongoDB.getTasks().findOne({ _id });

		if (!taskGroup) {
			return 'task was not found';
		}

		if (subTasksFormData_0) {
			taskGroup.subTasks.push({
				_id: new Types.ObjectId(),
				task: subTasksFormData_0,
				tag,
				isCompleted: false,
			});
		}
		if (subTasksFormData_1) {
			taskGroup.subTasks.push({
				_id: new Types.ObjectId(),
				task: subTasksFormData_1,
				tag,
				isCompleted: false,
			});
		}
		if (subTasksFormData_2) {
			taskGroup.subTasks.push({
				_id: new Types.ObjectId(),
				task: subTasksFormData_2,
				tag,
				isCompleted: false,
			});
		}

		await taskGroup.save();
		revalidatePath(`/dashboard/${_id}`);
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const addFile = async ({ formData, path, userId }: { formData: FormData; path: string; userId: string }) => {
	try {
		const user = await MongoDB.getUsers().findOne({ _id: userId });
		if (!user) {
			return 'user not found';
		}

		const file = formData.get('file') as File;
		const name = file.name;
		const level = '/dashboard/files';

		const mimeType = () => {
			if (file.type.includes('video')) return 'video';
			if (file.type.includes('image')) return 'image';
			if (file.type.includes('document')) return 'doc';
			return 'audio';
		};
		const icon = () => {
			if (file.type.includes('video')) return '/images/video.png';
			if (file.type.includes('image')) return '/images/image.png';
			if (file.type.includes('document')) return '/images/doc.png';
			return '/images/music.png';
		};

		const res = await backendClient.file.upload({
			content: {
				blob: new Blob([file], { type: file.type }),
				extension: file.type.split('/')[1],
			},
		});

		if (path !== level) {
			const pathStr = path.split('/dashboard/files/')[1];
			const dir = pathStr.split('/');
			console.log(dir);
			const folder = await MongoDB.getFiles().findOne({ _id: dir[0] });
			if (!folder) {
				return `folder does not exist`;
			}

			if (!isFolder(folder)) return 'wrong folder type';

			if (dir.length === 1) {
				folder.content.push({
					userId: user._id,
					_id: new Types.ObjectId().toString(),
					level,
					name,
					fileType: 'file',
					icon: icon(),
					mimeType: mimeType(),
					resource: res.url,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
				await folder.save();
				revalidatePath(path);
				return null;
			}

			if (dir.length === 2) {
				const currentFolder = folder.content.find((content) => content._id.toString() === dir[1]);
				if (!currentFolder) {
					return `folder does not exist`;
				}
				if (currentFolder.fileType === 'folder') {
					currentFolder.content.push({
						userId: user._id,
						_id: new Types.ObjectId().toString(),
						level,
						name,
						fileType: 'file',
						icon: icon(),
						mimeType: mimeType(),
						resource: res.url,
						createdAt: new Date(),
						updatedAt: new Date(),
					});

					await folder.save();
					revalidatePath(path);
					return null;
				}
			}
			if (dir.length === 3) {
				const currentFolder = folder.content.find((content) => content._id.toString() === dir[1]);
				if (isFolder(currentFolder!)) {
					const nextFolder = currentFolder.content.find((content) => content._id.toString() === dir[2]);
					nextFolder?.fileType === 'folder' &&
						nextFolder.content.push({
							userId: user._id,
							createdAt: new Date(),
							updatedAt: new Date(),
							_id: new Types.ObjectId().toString(),
							level,
							name,
							fileType: 'file',
							icon: icon(),
							mimeType: mimeType(),
							resource: res.url,
						});

					await folder.save();
					revalidatePath(path);
					return null;
				}
				return '';
			}
			return null;
		}

		await MongoDB.getFiles().create({
			level,
			name,
			fileType: 'file',
			icon: icon(),
			mimeType: mimeType(),
			resource: res.url,
			userId: user._id,
		});

		revalidatePath(path);

		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const addFolder = async ({ name, path, userId }: { name: string; path: string; userId: string }) => {
	try {
		const user = await MongoDB.getUsers().findOne({ _id: userId });
		if (!user) {
			return 'user not found';
		}

		const level = '/dashboard/files';

		if (path !== level) {
			const pathStr = path.split('/dashboard/files/')[1];
			const dir = pathStr.split('/');

			const folder = await MongoDB.getFiles().findOne({ _id: dir[0] });
			if (!folder) {
				return `folder does not exist`;
			}

			if (!isFolder(folder)) return 'wrong folder type';

			if (dir.length === 1) {
				folder.content.push({
					_id: new Types.ObjectId().toString(),
					level,
					name,
					fileType: 'folder',
					icon: '/images/folder.png',
					content: [],
					userId: user._id,
				});
				await folder.save();
				revalidatePath(path);
				return null;
			}

			if (dir.length === 2) {
				const currentFolder = folder.content.find((content) => content._id.toString() === dir[1]);
				if (!currentFolder) {
					return `folder does not exist`;
				}
				if (currentFolder.fileType === 'folder') {
					currentFolder.content.push({
						userId: user._id,
						_id: new Types.ObjectId().toString(),
						level,
						name,
						fileType: 'folder',
						icon: '/images/folder.png',
						content: [],
					});

					await folder.save();
					revalidatePath(path);
					return null;
				}
			}
			if (dir.length === 3) {
				const currentFolder = folder.content.find((content) => content._id.toString() === dir[1]);
				if (isFolder(currentFolder!)) {
					const nextFolder = currentFolder.content.find((content) => content._id.toString() === dir[2]);
					nextFolder?.fileType === 'folder' &&
						nextFolder.content.push({
							userId: user._id,

							_id: new Types.ObjectId().toString(),
							level,
							name,
							fileType: 'folder',
							icon: '/images/folder.png',
							content: [],
						});

					await folder.save();
					revalidatePath(path);
					return null;
				}
				return '';
			}
		}

		await MongoDB.getFiles().create({
			level,
			name,
			fileType: 'folder',
			icon: '/images/folder.png',
			content: [],
			userId: user._id,
		});
		revalidatePath(path);

		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const deleteFile = async ({ fileId, path }: { fileId: string; path: string }) => {
	try {
		const level = '/dashboard/files';

		if (path !== level) {
			const pathStr = path.split('/dashboard/files/')[1];
			const dir = pathStr.split('/');
			const folder = await MongoDB.getFiles().findOne({ _id: dir[0] });

			if (!folder) {
				return `folder does not exist`;
			}

			if (!isFolder(folder)) return 'wrong folder type';

			if (dir.length === 1) {
				let urlToDelete: string = '';
				const newContent = folder.content.filter((content) => {
					if (content._id.toString() === fileId) {
						urlToDelete = content.fileType === 'file' ? content.resource : '';
					}
					return content._id.toString() !== fileId;
				});
				try {
					await backendClient.file.deleteFile({ url: urlToDelete });
				} catch (e) {
					return e instanceof Error ? e.message : 'something went wrong';
				}
				folder.content = newContent;
				await folder.save();
				revalidatePath(path);
				return null;
			}

			if (dir.length === 2) {
				let urlToDelete: string = '';
				// const currentFolder = folder.content.find((content) => content._id.toString() === dir[1]);
				// if (!currentFolder) {
				// 	return `folder does not exist`;
				// }
				const currentFolderIndex = folder.content.findIndex((content) => content._id.toString() === dir[1]);
				if (currentFolderIndex === -1) {
					return `folder does not exist`;
				}

				const currentFolder = folder.content[currentFolderIndex];

				if (currentFolder.fileType === 'folder') {
					const newContent = currentFolder.content.filter((content) => {
						if (content._id.toString() === fileId) urlToDelete = content.fileType === 'file' ? content.resource : '';
						return content._id.toString() !== fileId;
					});

					try {
						await backendClient.file.deleteFile({ url: urlToDelete });
					} catch (e) {
						return e instanceof Error ? e.message : 'something went wrong';
					}

					currentFolder.content = newContent;
					folder.content[currentFolderIndex] = currentFolder;
					await folder.save();
					revalidatePath(path);
					return null;
				}
				return null;
			}

			if (dir.length === 3) {
				let urlToDelete: string = '';
				const currentFolderIndex = folder.content.findIndex((content) => content._id.toString() === dir[1]);
				if (currentFolderIndex === -1) {
					return `folder does not exist`;
				}
				const currentFolder = folder.content[currentFolderIndex];

				if (currentFolder.fileType === 'folder') {
					const nextFolderIndex = currentFolder.content.findIndex((content) => content._id.toString() === dir[2]);
					if (nextFolderIndex === -1) {
						return `folder does not exist`;
					}
					const nextFolder = currentFolder.content[nextFolderIndex];

					if (nextFolder.fileType === 'folder') {
						const newContent = nextFolder.content.filter((content) => {
							if (content._id.toString() === fileId) urlToDelete = content.fileType === 'file' ? content.resource : '';
							return content._id.toString() !== fileId;
						});

						try {
							await backendClient.file.deleteFile({ url: urlToDelete });
						} catch (e) {
							return e instanceof Error ? e.message : 'something went wrong';
						}

						nextFolder.content = newContent;
						currentFolder.content[nextFolderIndex] = nextFolder;
						folder.content[currentFolderIndex] = currentFolder;

						// Save the parent folder
						await folder.save();
						revalidatePath(path);
						return null;
					}
				}
			}
		}

		const file = await MongoDB.getFiles().findOne({ _id: fileId });

		if (!file) {
			return `file does not exist`;
		}

		try {
			await backendClient.file.deleteFile({ url: file.fileType === 'file' ? file.resource : '' });
		} catch (e) {
			return e instanceof Error ? e.message : 'something went wrong';
		}
		await file.deleteOne();
		// await file.save();
		revalidatePath(path);

		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const deleteFolder = async ({ folderId, path }: { folderId: string; path: string }) => {
	try {
		const level = '/dashboard/files';

		if (path !== level) {
			const pathStr = path.split('/dashboard/files/')[1];
			const dir = pathStr.split('/');
			const folder = await MongoDB.getFiles().findOne({ _id: dir[0] });

			if (!folder) {
				return `folder does not exist`;
			}

			if (!isFolder(folder)) return 'wrong folder type';

			if (dir.length === 1) {
				folder.content = folder.content.filter((content) => content._id.toString() !== folderId);
				await folder.save();
				revalidatePath(path);
				return null;
			}
		}

		const folder = await MongoDB.getFiles().findOne({ _id: folderId });
		if (!folder) {
			return `folder does not exist`;
		}
		await folder.deleteOne();
		revalidatePath(path);

		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};
