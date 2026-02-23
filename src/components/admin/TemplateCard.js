'use client';

export default function TemplateCard({ template, onToggleEnable, onDelete }) {
    const handleToggle = async () => {
        try {
            const response = await fetch(`/api/admin/templates/${template.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enabled: !template.enabled }),
            });

            if (response.ok) {
                onToggleEnable();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${template.name}?`)) return;

        try {
            const response = await fetch(`/api/admin/templates/${template.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                onDelete();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={template.preview} alt={template.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-bold">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.category}</p>
                {template.premium && (
                    <span className="inline-block mt-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                        Premium
                    </span>
                )}
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={handleToggle}
                        className={`flex-1 px-3 py-2 rounded text-sm font-medium ${template.enabled
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-400 text-white hover:bg-gray-500'
                            }`}
                    >
                        {template.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
