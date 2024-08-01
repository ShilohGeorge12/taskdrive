import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './lib/sessions';

export async function middleware(req: NextRequest) {
	try {
		const res = NextResponse.next();

		if (req.nextUrl.pathname.includes('dashboard') && !req.nextUrl.pathname.includes('/_next')) {
			// return NextResponse.redirect(new URL('/', req.url));
			return await updateSession(req);
		}

		return res;
	} catch (error) {
		if (error instanceof Error && error.name === 'TokenExpiredError') {
			return NextResponse.json({ authStatus: error.message, user: {} }, { status: 400 });
		}

		if (error instanceof Error && error.name === 'JsonWebTokenError') {
			return NextResponse.json({ authStatus: 'invalid token', user: {} }, { status: 401 });
		}

		if (error instanceof Error) {
			console.log({ msg: error.message, cause: error.stack });
		}
	}
}
