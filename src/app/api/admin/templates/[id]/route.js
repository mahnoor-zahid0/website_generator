import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

// Update template (enable/disable)
export async function PUT(request, { params }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Admin access required' },
                { status: 403 }
            );
        }

        const { id } = await params;
        const { enabled } = await request.json();

        const template = await prisma.template.update({
            where: { id: parseInt(id) },
            data: { enabled },
        });

        return NextResponse.json({ success: true, template });
    } catch (error) {
        console.error('Update template error:', error);
        return NextResponse.json(
            { error: 'Failed to update template' },
            { status: 500 }
        );
    }
}

// Delete template
export async function DELETE(request, { params }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Admin access required' },
                { status: 403 }
            );
        }

        const { id } = await params;

        // Get template info
        const template = await prisma.template.findUnique({
            where: { id: parseInt(id) },
        });

        if (!template) {
            return NextResponse.json(
                { error: 'Template not found' },
                { status: 404 }
            );
        }

        // Delete from database
        await prisma.template.delete({
            where: { id: parseInt(id) },
        });

        // Delete template folder
        const templateFolder = path.join(process.cwd(), 'public', 'templates', template.folderName);
        if (fs.existsSync(templateFolder)) {
            fs.rmSync(templateFolder, { recursive: true, force: true });
        }

        // Delete preview image
        const previewPath = path.join(process.cwd(), 'public', template.preview);
        if (fs.existsSync(previewPath)) {
            fs.unlinkSync(previewPath);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete template error:', error);
        return NextResponse.json(
            { error: 'Failed to delete template' },
            { status: 500 }
        );
    }
}
