import { validateSession } from '$lib/server/auth';

const publicPaths = ['/login'];

export async function handle({ event, resolve }) {
	const token = event.cookies.get('session');
	const authenticated = validateSession(token);

	if (event.url.pathname === '/login' && authenticated) {
		return new Response(null, {
			status: 303,
			headers: { location: '/' }
		});
	}

	if (!publicPaths.includes(event.url.pathname) && !authenticated) {
		return new Response(null, {
			status: 303,
			headers: { location: '/login' }
		});
	}

	const response = await resolve(event);

	response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'");
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	return response;
}
