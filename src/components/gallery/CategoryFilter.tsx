import React from 'react';

interface Category {
    id: string;
    label: string;
}

interface CategoryFilterProps {
    categories: Category[];
    selected: string;
    onSelect: (id: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selected, onSelect }) => {
    return (
        <div className="flex !gap-2 overflow-x-auto !pb-2 !px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map(category => (
                <button
                    key={category.id}
                    className={`!whitespace-nowrap !px-4 !py-2 !rounded-full !text-sm !font-medium !transition-all !duration-200 ${
                        selected === category.id 
                            ? '!bg-purple-600 !text-white !shadow-sm' 
                            : '!bg-gray-100 !text-gray-700 hover:!bg-gray-200'
                    }`}
                    onClick={() => onSelect(category.id)}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter; 