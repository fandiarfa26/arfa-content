const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;

export function createSession(): string {
	return Date.now().toString();
}

export function validateSession(token: string | undefined): boolean {
	if (!token) return false;
	const ts = Number(token);
	if (isNaN(ts)) return false;
	return Date.now() - ts < SESSION_TTL;
}

export function destroySession() {}
