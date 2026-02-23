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
            data: { role: 'REGULAR' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('Downgrade user error:', error);
        return NextResponse.json(
            { error: 'Failed to downgrade user' },
            { status: 500 }
        );
    }
}
