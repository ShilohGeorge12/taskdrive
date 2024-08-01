'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition, useState, FormEvent, ChangeEvent } from 'react';
import { EMAIL_REGEX, INVALID_EMAIL_MESSAGE, PASSWORD_FORMAT_MESSAGE, PASSWORD_REGEX } from '@/types';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { onLogin } from '@/actions';

export function Form() {
	const initState = {
		email: '',
		password: '',
	};
	const { push } = useRouter();
	const [formData, setFormData] = useState(initState);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [viewPassword, setViewPassword] = useState(false);
	const [isPending, startTransition] = useTransition();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage([]);

		let hasError: boolean = false;
		if (!EMAIL_REGEX.test(formData.email.toString())) {
			setErrorMessage((prev) => [...prev, INVALID_EMAIL_MESSAGE]);
			hasError = true;
		}

		if (!PASSWORD_REGEX.test(formData.password.toString())) {
			setErrorMessage((prev) => [...prev, PASSWORD_FORMAT_MESSAGE]);
			hasError = true;
		}

		if (hasError) return;
		startTransition(async () => {
			const error = await onLogin({
				email: formData.email.trim(),
				password: formData.password.trim(),
			});

			if (error) {
				return setErrorMessage([error]);
			}

			push('/dashboard');
		});
	};

	return (
		<form
			onSubmit={onSubmit}
			className='w-[90%] md:w-[60%] h-[65%] mt-4 mx-auto flex flex-col items-center justify-center gap-9 md:gap-8'>
			<div className='w-[90%] md:w-2/4 flex flex-col justify-center gap-2'>
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

			<div className='w-[90%] md:w-2/4 flex flex-col justify-center gap-2'>
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
						className='size-full px-4 bg-white/70 focus:bg-white ring-0 hover:ring-1 focus:ring-2 ring-white/70 focus:ring-white rounded-lg outline-0 tracking-wide transition-all duration-500 ease-in-out'
					/>
					<button
						type='button'
						name={``}
						className={`absolute top-3 right-3 `}
						onClick={() => setViewPassword((prev) => !prev)}>
						{viewPassword ? <FaEye /> : <FaEyeSlash />}
					</button>
				</div>

				<Link
					href={'forget-password'}
					title='forget Password Link'
					className='font-semibold tracking-wide text-right hover:underline'>
					Forget Password
				</Link>
			</div>

			<button
				type='submit'
				name={`login button`}
				className='w-[90%] md:w-2/4 h-10 px-4 flex items-center justify-center gap-4 bg-white focus:bg-white ring-0 hover:ring-1 focus:ring-2 ring-white disabled:ring-white/50 disabled:bg-white/50 rounded-lg outline-0 tracking-wider transition-all duration-500 ease-in-out text-lg font-semibold'
				disabled={isPending}>
				{isPending && (
					<span className='text-2xl'>
						<FaSpinner className='animate-spin' />
					</span>
				)}
				Submit
			</button>
			{errorMessage.length > 0 && (
				<ul className='w-[90%] md:w-2/4 py-1 flex flex-col justify-evenly gap-3'>
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
