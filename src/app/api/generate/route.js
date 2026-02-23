import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { generateWebsiteZip } from '@/lib/generator';

export async function POST(request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const { templateId, data } = await request.json();

        if (!templateId || !data) {
            return NextResponse.json(
                { error: 'Template ID and data are required' },
                { status: 400 }
            );
        }

        // Get template
        const template = await prisma.template.findUnique({
            where: { id: parseInt(templateId) },
        });

        if (!template) {
            return NextResponse.json(
                { error: 'Template not found' },
                { status: 404 }
            );
        }

        // Check if user has access to premium template
        if (template.premium && currentUser.role === 'REGULAR') {
            return NextResponse.json(
                { error: 'Premium template requires premium subscription' },
                { status: 403 }
            );
        }

        // Generate website
        const { zipPath, zipFileName } = await generateWebsiteZip(
            template.folderName,
            data,
            currentUser.id,
            template.id
        );

        // Save to database
        const website = await prisma.website.create({
            data: {
                userId: currentUser.id,
                templateId: template.id,
                title: data.name || 'My Website',
                data: data,
                zipPath: zipPath,
            },
        });

        return NextResponse.json({
            success: true,
            zipUrl: zipPath,
            websiteId: website.id,
        });
    } catch (error) {
        console.error('Generate website error:', error);
        return NextResponse.json(
            { error: 'Failed to generate website' },
            { status: 500 }
        );
    }
}
