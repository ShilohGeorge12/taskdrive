'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState, useTransition } from 'react';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

import { PASSWORD_FORMAT_MESSAGE, PASSWORD_REGEX } from '@/types';

import { onResetPassword } from '@/actions';

export function ResetPasswordForm({ email }: { email: string }) {
	const initState = {
		password: '',
		confirmPassword: '',
	};
	const { push } = useRouter();
	const [formData, setFormData] = useState(initState);
	const [viewPassword, setViewPassword] = useState(false);
	const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [isPending, startTransition] = useTransition();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage([]);
		let hasError: boolean = false;

		if (!PASSWORD_REGEX.test(formData.password)) {
			setErrorMessage((prev) => [...prev, PASSWORD_FORMAT_MESSAGE]);
			hasError = true;
		}

		if (formData.password !== formData.confirmPassword) {
			setErrorMessage((prev) => [...prev, 'password and confirm password must be the same']);
			hasError = true;
		}

		if (hasError) return;
		startTransition(async () => {
			const error = await onResetPassword({
				email: email.trim(),
				password: formData.password.trim(),
			});

			if (error) {
				setErrorMessage([error]);
				return;
			}

			push('/login');
		});
	};

	return (
		<form
			onSubmit={onSubmit}
			className='w-[90%] md:w-[60%] min-h-[70%] mt-4 mx-auto gap-10 md:gap-8 flex flex-col items-center justify-center'>
			<div className='w-[90%] md:w-1/2 flex flex-col justify-center gap-2'>
				<label
					htmlFor='password'
					className='font-semibold tracking-wider md:text-xl'>
					Password
				</label>

				<div className='w-full h-10 relative'>
					<input
						type={viewPassword ? 'text' : 'password'}
						id='password'
						name='password'
						inputMode='text'
						required
						value={formData.password}
						onChange={onChange}
						disabled={isPending}
						className='w-full h-10 px-4 bg-white/70 focus:bg-white ring-0 hover:ring-1 focus:ring-2 ring-white/70 focus:ring-white rounded-lg outline-0 tracking-wide transition-all duration-500 ease-in-out'
					/>

					<button
						type='button'
						name={``}
						className={`absolute top-3 right-3 `}
						onClick={() => setViewPassword((prev) => !prev)}
						disabled={isPending}>
						{viewPassword ? <FaEye /> : <FaEyeSlash />}
					</button>
				</div>
			</div>
			<div className='w-[90%] md:w-1/2 flex flex-col justify-center gap-2 '>
				<label
					htmlFor='confirmPassword'
					className='font-semibold tracking-wider md:text-xl'>
					Confirm Password
				</label>

				<div className='w-full h-10 relative'>
					<input
						type={viewConfirmPassword ? 'text' : 'password'}
						id='confirmPassword'
						name='confirmPassword'
						inputMode='text'
						required
						value={formData.confirmPassword}
						onChange={onChange}
						disabled={isPending}
						className='size-full px-4 bg-white/70 focus:bg-white ring-0 hover:ring-1 focus:ring-2 ring-white/70 focus:ring-white rounded-lg outline-0 tracking-wide transition-all duration-500 ease-in-out'
					/>

					<button
						type='button'
						name={``}
						className={`absolute top-3 right-3 `}
						onClick={() => setViewConfirmPassword((prev) => !prev)}
						disabled={isPending}>
						{viewConfirmPassword ? <FaEye /> : <FaEyeSlash />}
					</button>
				</div>
			</div>

			<button
				type='submit'
				name={`sign up Button`}
				className={` w-[90%] md:w-2/4 h-10 px-4 flex items-center justify-center gap-4 bg-white/70 focus:bg-white ring-0 hover:ring-1 focus:ring-2 ring-white/70 disabled:ring-white/50 disabled:bg-white/50 rounded-lg outline-0 tracking-wider transition-all duration-500 ease-in-out text-lg font-semibold`}
				disabled={isPending}>
				{isPending && (
					<span className='text-2xl'>
						<FaSpinner className='animate-spin' />
					</span>
				)}
				Sign Up
			</button>

			{errorMessage.length > 0 && (
				<ul className='w-[90%] md:w-2/4 py-1  flex flex-col justify-evenly gap-3'>
					{errorMessage.map((error) => (
						<li
							key={error + ' message'}
							className='font-medium '>
							{error}
						</li>
					))}
				</ul>
			)}
		</form>
	);
}
