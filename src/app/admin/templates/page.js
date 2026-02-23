'use client';

import { useState, useEffect } from 'react';
import UploadForm from '@/components/admin/UploadForm';
import TemplateCard from '@/components/admin/TemplateCard';

export default function AdminTemplatesPage() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTemplates = async () => {
        try {
            const response = await fetch('/api/admin/templates');
            const data = await response.json();
            setTemplates(data.templates || []);
        } catch (error) {
            console.error('Error fetching templates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Template Management</h1>

            <div className="mb-8">
                <UploadForm onUploadSuccess={fetchTemplates} />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">All Templates</h2>
                {loading ? (
                    <p className="text-gray-600">Loading...</p>
                ) : templates.length === 0 ? (
                    <p className="text-gray-600">No templates yet. Upload your first template above.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                onToggleEnable={fetchTemplates}
                                onDelete={fetchTemplates}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
