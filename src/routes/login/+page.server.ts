import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '$lib/server/auth';
import { env } from '$env/dynamic/private';
import { timingSafeEqual } from 'crypto';

const attempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const entry = attempts.get(ip);
	if (!entry || now > entry.resetAt) {
		attempts.set(ip, { count: 1, resetAt: now + 60_000 });
		return true;
	}
	if (entry.count >= 10) return false;
	entry.count++;
	return true;
}

export const actions = {
	default: async ({ request, cookies, getClientAddress }) => {
		const data = await request.formData();
		const password = data.get('password') as string;

		if (!checkRateLimit(getClientAddress())) {
			return fail(429, { error: 'Too many attempts. Try again in 1 minute.' });
		}

		const buf = Buffer.from(password || '');
		const expected = Buffer.from(env.APP_PASSWORD || '');
		const ok = buf.length === expected.length && timingSafeEqual(buf, expected);

		if (!ok) {
			return fail(401, { error: 'Password salah' });
		}

		const token = createSession();
		cookies.set('session', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7
		});

		redirect(303, '/');
	}
};
