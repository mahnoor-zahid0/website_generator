'use client';

import { useState } from 'react';

export default function UploadForm({ onUploadSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        premium: false,
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('category', formData.category);
            data.append('premium', formData.premium);
            data.append('zipFile', file);

            const response = await fetch('/api/admin/templates', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (result.success) {
                alert('Template uploaded successfully!');
                setFormData({ name: '', category: '', premium: false });
                setFile(null);
                if (onUploadSuccess) onUploadSuccess();
            } else {
                alert(result.error || 'Failed to upload template');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to upload template');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Upload New Template</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="e.g., Portfolio, Business, Blog"
                        required
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="premium"
                        checked={formData.premium}
                        onChange={(e) => setFormData({ ...formData, premium: e.target.checked })}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="premium" className="ml-2 block text-sm text-gray-700">
                        Premium Template
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP File</label>
                    <input
                        type="file"
                        accept=".zip"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full"
                        required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Must include: index.html and preview.png
                    </p>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? 'Uploading...' : 'Upload Template'}
            </button>
        </form>
    );
}
