'use client';

interface BtnProps {
	title: string;
	style: {
		size: string;
		color: string;
		shadow: string;
		more?: string;
	};
	onClick?: () => void;
}

export function Btn({ style, title, onClick }: BtnProps) {
	return (
		<button
			type='button'
			name={title}
			className={`${style.size} ${style.color} ${style.shadow} rounded-lg ease-linear transition duration-300 hover:scale-105 ${style.more}`}
			onClick={onClick}>
			{title}
		</button>
	);
}
