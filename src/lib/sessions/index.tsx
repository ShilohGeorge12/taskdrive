import 'server-only';

// import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { loginDetails, sessionType } from '@/types';
import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.SECRET as string;
const key = new TextEncoder().encode(secretKey);
const MINUTES = 120;
const SECONDS = 60;
const MILLISECONDS = 1000;
const expiryTime = new Date(Date.now() + MINUTES * SECONDS * MILLISECONDS);

export async function encrypt(payload: any) {
	return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(expiryTime).sign(key);
}

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ['HS256'],
	});
	return payload;
}

export async function login(logindetails: loginDetails) {
	// Create the session
	const { email, firstname, lastname, _id } = logindetails;
	const user = {
		_id,
		firstname,
		lastname,
		email,
	};
	const session = await encrypt({ user, expires: expiryTime });
	cookies().set('session', session, { expires: expiryTime, httpOnly: true });
}

export async function logout() {
	// Destroy the session
	cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession(): Promise<sessionType | null> {
	const session = cookies().get('session');
	if (!session) return null; //redirect('/getstarted');
	return await decrypt(session.value);
}

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get('session')?.value;
	if (session) return NextResponse.next();
	return NextResponse.redirect(new URL('/login', request.url));
}
