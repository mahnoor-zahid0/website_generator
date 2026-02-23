import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const template = await prisma.template.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                name: true,
                folderName: true,
                preview: true,
                category: true,
                premium: true,
                enabled: true,
            },
        });

        if (!template) {
            return NextResponse.json(
                { error: 'Template not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ template });
    } catch (error) {
        console.error('Get template error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
