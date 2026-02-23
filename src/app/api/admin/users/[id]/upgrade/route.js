import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

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

        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { role: 'PREMIUM' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('Upgrade user error:', error);
        return NextResponse.json(
            { error: 'Failed to upgrade user' },
            { status: 500 }
        );
    }
}
