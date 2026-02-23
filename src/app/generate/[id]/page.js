'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ContentForm from '@/components/user/ContentForm';

export default function GeneratePage({ params }) {
    const router = useRouter();
    const [zipUrl, setZipUrl] = useState(null);
    const templateId = params.id;

    const handleGenerated = (url) => {
        setZipUrl(url);
    };

    if (zipUrl) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <div className="mb-6">
                        <svg
                            className="mx-auto h-16 w-16 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Website Generated!</h2>
                    <p className="text-gray-600 mb-6">Your custom website is ready to download.</p>
                    <a
                        href={zipUrl}
                        download
                        className="block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
                    >
                        Download ZIP
                    </a>
                    <button
                        onClick={() => router.push('/')}
                        className="text-blue-600 hover:underline"
                    >
                        Create Another Website
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <ContentForm templateId={templateId} onSubmit={handleGenerated} />
            </div>
        </div>
    );
}
