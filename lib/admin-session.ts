import crypto from 'node:crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ADMIN_COOKIE_NAME = 'admin_token';
const SESSION_TTL_SECONDS = 60 * 60 * 24;

function getSessionSecret() {
    return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'hostel2025';
}

function signSessionPayload(payload: string) {
    return crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
}

export function createAdminSessionToken(now = Date.now()) {
    const expiresAt = now + SESSION_TTL_SECONDS * 1000;
    const payload = `v1.${expiresAt}`;
    const signature = signSessionPayload(payload);

    return `${payload}.${signature}`;
}

export function isValidAdminSessionToken(token?: string | null) {
    if (!token) {
        return false;
    }

    const [version, expiresAtRaw, signature] = token.split('.');
    if (!version || !expiresAtRaw || !signature || version !== 'v1') {
        return false;
    }

    const expiresAt = Number(expiresAtRaw);
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
        return false;
    }

    const expectedSignature = signSessionPayload(`${version}.${expiresAtRaw}`);
    const actualBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (actualBuffer.length !== expectedBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

export function hasValidAdminSession(request: Pick<NextRequest, 'cookies'>) {
    return isValidAdminSessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

export function applyAdminSessionCookie(response: NextResponse) {
    response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: SESSION_TTL_SECONDS,
        path: '/',
    });

    return response;
}

export function clearAdminSessionCookie(response: NextResponse) {
    response.cookies.delete(ADMIN_COOKIE_NAME);
    return response;
}

export function requireAdminRequest(request: NextRequest) {
    if (hasValidAdminSession(request)) {
        return null;
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
