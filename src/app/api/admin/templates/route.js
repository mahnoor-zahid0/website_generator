import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { extractZip, validateTemplateStructure } from '@/lib/template';
import fs from 'fs';
import path from 'path';

// Get all templates (admin only)
export async function GET() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Admin access required' },
                { status: 403 }
            );
        }

        const templates = await prisma.template.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({ templates });
    } catch (error) {
        console.error('Get templates error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Upload new template (admin only)
export async function POST(request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Admin access required' },
                { status: 403 }
            );
        }

        const formData = await request.formData();
        const name = formData.get('name');
        const category = formData.get('category');
        const premium = formData.get('premium') === 'true';
        const zipFile = formData.get('zipFile');

        if (!name || !category || !zipFile) {
            return NextResponse.json(
                { error: 'Name, category, and ZIP file are required' },
                { status: 400 }
            );
        }

        // Generate folder name
        const folderName = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const templateFolder = path.join(process.cwd(), 'public', 'templates', folderName);

        // Check if folder already exists
        if (fs.existsSync(templateFolder)) {
            return NextResponse.json(
                { error: 'Template with this name already exists' },
                { status: 409 }
            );
        }

        // Create folder
        fs.mkdirSync(templateFolder, { recursive: true });

        // Extract ZIP
        const bytes = await zipFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await extractZip(buffer, templateFolder);

        // Validate structure
        const validation = validateTemplateStructure(templateFolder);
        if (!validation.valid) {
            // Clean up
            fs.rmSync(templateFolder, { recursive: true, force: true });
            return NextResponse.json(
                { error: `Missing required file: ${validation.missing}` },
                { status: 400 }
            );
        }

        // Copy preview to previews folder
        const previewSource = path.join(templateFolder, 'preview.png');
        const previewDest = path.join(process.cwd(), 'public', 'previews', `${folderName}.png`);
        fs.mkdirSync(path.dirname(previewDest), { recursive: true });
        fs.copyFileSync(previewSource, previewDest);

        // Save to database
        const template = await prisma.template.create({
            data: {
                name,
                folderName,
                preview: `/previews/${folderName}.png`,
                category,
                premium,
                enabled: true,
            },
        });

        return NextResponse.json({
            success: true,
            template,
        });
    } catch (error) {
        console.error('Upload template error:', error);
        return NextResponse.json(
            { error: 'Failed to upload template' },
            { status: 500 }
        );
    }
}
