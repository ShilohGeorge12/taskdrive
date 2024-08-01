'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function NotFoundAnimate({ children }: { children: ReactNode }) {
	return (
		<motion.section
			className={`flex flex-col items-center justify-center gap-8 w-full min-h-[80vh]`}
			initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
			exit={{ opacity: 0, translateZ: -100 }}
			transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
			{children}
		</motion.section>
	);
}
