import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdminRequest } from '@/lib/admin-session';

export async function POST(request: NextRequest): Promise<NextResponse> {
    const unauthorizedResponse = await requireAdminRequest(request);
    if (unauthorizedResponse) {
        return unauthorizedResponse;
    }

    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async () => {
                // Authenticate authorized users here if needed in the future
                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
                    tokenPayload: JSON.stringify({
                        // optional, sent to your server on upload completion
                    }),
                };
            },
            onUploadCompleted: async () => {
                // This callback remains available for future post-upload actions.
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 }, // The webhook must return 400 on error
        );
    }
}
