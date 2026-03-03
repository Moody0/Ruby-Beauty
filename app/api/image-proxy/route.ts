import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return new NextResponse('Missing URL parameter', { status: 400 });
    }

    try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
            return new NextResponse(`Failed to fetch image: ${response.statusText}`, { status: response.status });
        }

        const contentType = response.headers.get('content-type');
        const buffer = await response.arrayBuffer();

        const headers = new Headers();
        if (contentType) headers.set('Content-Type', contentType);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        return new NextResponse(buffer, { headers });
    } catch (error) {
        console.error('Image proxy error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
