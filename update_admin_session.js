const fs = require('fs');
const path = require('path');

const adminSessionPath = path.join(__dirname, 'lib', 'admin-session.ts');
const newAdminSession = `import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ADMIN_COOKIE_NAME = 'admin_token';
const SESSION_TTL_SECONDS = 60 * 60 * 24;

function getSessionSecret() {
    return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'hostel2025';
}

async function getCryptoKey(secret: string) {
    const encoder = new TextEncoder();
    return await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify']
    );
}

function buf2hex(buffer: ArrayBuffer) {
    return Array.from(new Uint8Array(buffer)).map(x => ('00' + x.toString(16)).slice(-2)).join('');
}

// Timing safe equal using Web Crypto API or simple iterative check (Web Crypto doesn't have exact timingSafeEqual for strings directly)
function timingSafeEqualStr(a: string, b: string) {
    if (a.length !== b.length) return false;
    let mismatch = 0;
    for (let i = 0; i < a.length; i++) {
        mismatch |= (a.charCodeAt(i) ^ b.charCodeAt(i));
    }
    return mismatch === 0;
}

async function signSessionPayload(payload: string) {
    const encoder = new TextEncoder();
    const key = await getCryptoKey(getSessionSecret());
    const signatureBuffer = await crypto.subtle.sign(
        'HMAC',
        key,
        encoder.encode(payload)
    );
    return buf2hex(signatureBuffer);
}

export async function createAdminSessionToken(now = Date.now()) {
    const expiresAt = now + SESSION_TTL_SECONDS * 1000;
    const payload = \`v1.\${expiresAt}\`;
    const signature = await signSessionPayload(payload);

    return \`\${payload}.\${signature}\`;
}

export async function isValidAdminSessionToken(token?: string | null) {
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

    const expectedSignature = await signSessionPayload(\`\${version}.\${expiresAtRaw}\`);

    return timingSafeEqualStr(signature, expectedSignature);
}

export async function hasValidAdminSession(request: Pick<NextRequest, 'cookies'>) {
    return await isValidAdminSessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

export async function applyAdminSessionCookie(response: NextResponse) {
    response.cookies.set(ADMIN_COOKIE_NAME, await createAdminSessionToken(), {
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

export async function requireAdminRequest(request: NextRequest) {
    if (await hasValidAdminSession(request)) {
        return null;
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
`;

fs.writeFileSync(adminSessionPath, newAdminSession);
console.log('Updated admin-session.ts');

const replaceFiles = [
    'middleware.ts',
    'app/api/admin/login/route.ts',
    'app/api/bookings/[id]/route.ts',
    'app/api/bookings/route.ts',
    'app/api/rooms/[id]/route.ts',
    'app/api/rooms/route.ts',
    'app/api/settings/route.ts',
    'app/api/upload/route.ts'
];

replaceFiles.forEach(relPath => {
    const fullPath = path.join(__dirname, relPath);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');

    content = content.replace(/(!)?hasValidAdminSession\(/g, '$1await hasValidAdminSession(');
    content = content.replace(/requireAdminRequest\(/g, 'await requireAdminRequest(');
    content = content.replace(/applyAdminSessionCookie\(/g, 'await applyAdminSessionCookie(');

    fs.writeFileSync(fullPath, content);
    console.log('Updated', relPath);
});
