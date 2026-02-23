import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
    try {
        const currentUser = await getCurrentUser();

        // Get user role (default to REGULAR if not authenticated)
        const userRole = currentUser?.role || 'REGULAR';

        // Fetch templates based on user role
        const templates = await prisma.template.findMany({
            where: {
                enabled: true,
                ...(userRole === 'REGULAR' ? { premium: false } : {}), // Regular users can only see free templates
            },
            select: {
                id: true,
                name: true,
                preview: true,
                category: true,
                premium: true,
                enabled: true,
            },
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
