'use client';

import { useTransition, useState, FormEvent, ChangeEvent } from 'react';
import { EMAIL_REGEX, INVALID_EMAIL_MESSAGE, NAME_REGEX, PASSWORD_FORMAT_MESSAGE, PASSWORD_REGEX } from '@/types';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { onSignUp } from '@/actions';
import { useRouter } from 'next/navigation';

export function SignUpForm() {
	const initState = {
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		confirmPassword: '',
	};
	const { push } = useRouter();
	const [formData, setFormData] = useState(initState);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [viewPassword, setViewPassword] = useState(false);
	const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
	const [isPending, startTransition] = useTransition();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage([]);

		let hasError: boolean = false;

		if (!EMAIL_REGEX.test(formData.email)) {
			setErrorMessage((prev) => [...prev, INVALID_EMAIL_MESSAGE]);
			hasError = true;
		}

		if (!PASSWORD_REGEX.test(formData.password)) {
			setErrorMessage((prev) => [...prev, PASSWORD_FORMAT_MESSAGE]);
			hasError = true;
		}

		if (formData.password !== formData.confirmPassword) {
			setErrorMessage((prev) => [...prev, 'password and confirm password must be the same']);
			hasError = true;
		}

		if (!NAME_REGEX.test(formData.firstname)) {
			setErrorMessage((prev) => [...prev, 'firstname must be at least 2 characters long and can only contain letters and space']);
			hasError = true;
		}

		if (!NAME_REGEX.test(formData.lastname)) {
			setErrorMessage((prev) => [...prev, 'lastname must be at least 2 characters long and can only contain letters and space']);
			hasError = true;
		}

		if (hasError) return;
		startTransition(async () => {
			const error = await onSignUp({
				firstname: formData.firstname.trim(),
				lastname: formData.lastname.trim(),
				email: formData.email.trim(),
				password: formData.password.trim(),
			});

			if (error) {
				return setErrorMessage([error]);
			}

			push('/');
		});
	};

	return (
		<form
			onSubmit={onSubmit}
			className='w-[90%] md:w-[70%] min-h-[60%] mt-4 mx-auto gap-6 md:gap-2 grid grid-cols-1 md:grid-cols-2 place-items-center'>
			<div className='w-[90%] flex flex-col justify-center gap-1 col-span-1'>
				<label
					htmlFor='firstname'
					className='font-semibold tracking-wider md:text-xl'>
					Firstname
				</label>
				<input
					type='text'
					id='firstname'
					name='firstname'
					inputMode='text'
					required
					value={formData.firstname}
					onChange={onChange}
					disabled={isPending}
					className='w-full h-10 px-4 bg-white/70 focus:bg-white ring-0 hover:ring-1 focus:ring-2 ring-white/70 focus:ring-white rounded-lg outline-0 tracking-wide transition-all duration-500 ease-in-out'
				/>
			</div>
			<div className='w-[90%] flex flex-col justify-center gap-2 col-span-1'>
				<label
					htmlFor='lastname'
					className='font-semibold tracking-wider md:text-xl'>
					Lastname
				</label>
				<input
					type='text'
					id='lastname'
					name='lastname'
					inputMode='email'
					required
					value={formData.lastname}
					onChange={onChange}
					disabled={isPending}
					className='w-full h-10 px-4 bg-white/70 focus:bg-white ring-0 hover:ring-1 focus:ring-2 ring-white/70 focus:ring-white rounded-lg outline-0 tracking-wide transition-all duration-500 ease-in-out'
				/>
			</div>
			<div className='w-[90%] flex flex-col justify-center gap-2 col-span-1'>
				<label
					htmlFor='email'
					className='font-semibold tracking-wider md:text-xl'>
					Email
				</label>
				<input
					type='text'
					id='email'
					name='email'
					inputMode='email'
					required
					value={formData.email}
					onChange={onChange}
					disabled={isPending}
					className='w-full h-10 px-4 bg-white/70 focus:bg-white ring-0 hover:ring-1 focus:ring-2 ring-white/70 focus:ring-white rounded-lg outline-0 tracking-wide transition-all duration-500 ease-in-out'
				/>
			</div>
			<div className='w-[90%] flex flex-col justify-center gap-2 col-span-1'>
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
						onClick={() => setViewPassword((prev) => !prev)}>
						{viewPassword ? <FaEye /> : <FaEyeSlash />}
					</button>
				</div>
			</div>
			<div className='w-[90%] flex flex-col justify-center gap-2 col-span-1'>
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
						onClick={() => setViewConfirmPassword((prev) => !prev)}>
						{viewConfirmPassword ? <FaEye /> : <FaEyeSlash />}
					</button>
				</div>
			</div>

			<button
				type='submit'
				name={`sign up Button`}
				className={`col-span-1 md:col-span-2 w-[90%] md:w-2/4 h-10 px-4 flex items-center justify-center gap-4 bg-white focus:bg-white ring-0 hover:ring-1 focus:ring-2 ring-white disabled:ring-white/50 disabled:bg-white/50 rounded-lg outline-0 tracking-wider transition-all duration-500 ease-in-out text-lg font-semibold`}
				disabled={isPending}>
				{isPending && (
					<span className='text-2xl'>
						<FaSpinner className='animate-spin' />
					</span>
				)}
				Sign Up
			</button>

			{errorMessage.length > 0 && (
				<ul className='w-[90%] md:w-2/4 py-1 col-span-1 md:col-span-2 flex flex-col justify-evenly gap-3'>
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
