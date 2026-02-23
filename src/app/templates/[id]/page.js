async function getTemplate(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/templates/${id}`, {
            cache: 'no-store',
        });
        const data = await response.json();
        return data.template;
    } catch (error) {
        console.error('Error fetching template:', error);
        return null;
    }
}

export default async function TemplatePreviewPage({ params }) {
    const template = await getTemplate(params.id);

    if (!template) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Template Not Found</h1>
                    <a href="/" className="text-blue-600 hover:underline">
                        Back to Templates
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-96 object-cover"
                    />
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-3xl font-bold">{template.name}</h1>
                            {template.premium && (
                                <span className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold">
                                    Premium
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 mb-2">Category: {template.category}</p>
                        <p className="text-gray-700 mb-6">
                            This template is {template.premium ? 'premium' : 'free'} and includes all the
                            essential pages for a professional website.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href={`/generate/${template.id}`}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors"
                            >
                                Use This Template
                            </a>
                            <a
                                href="/"
                                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold text-center hover:bg-gray-300 transition-colors"
                            >
                                Browse More Templates
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
