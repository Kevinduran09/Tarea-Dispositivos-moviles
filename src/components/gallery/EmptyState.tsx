import React from 'react';

interface Category {
    id: string;
    label: string;
}

interface EmptyStateProps {
    selectedCategory: string;
    categories: Category[];
}

const EmptyState: React.FC<EmptyStateProps> = ({ selectedCategory, categories }) => {
    const categoryLabel = categories.find(c => c.id === selectedCategory)?.label || 'Todas';
    return (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">

            <h2 className="text-lg font-semibold mb-2">No hay fotos</h2>
            <p className="text-sm">No se encontraron fotos en la categoría <b>{categoryLabel}</b>.</p>
        </div>
    );
};

export default EmptyState; 