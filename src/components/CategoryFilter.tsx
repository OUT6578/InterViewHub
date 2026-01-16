import React from "react";

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  showAllCategories: boolean;
  setShowAllCategories: (show: boolean) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  showAllCategories,
  setShowAllCategories,
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {(showAllCategories ? categories : categories.slice(0, 5)).map((cat) => {
        const Icon = cat.icon;
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
              activeCategory === cat.id
                ? `${cat.color} text-white shadow-lg`
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon size={20} />
            {cat.name}
          </button>
        );
      })}
      {categories.length > 5 && (
        <button
          onClick={() => setShowAllCategories(!showAllCategories)}
          className="px-6 py-3 rounded-full font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
        >
          {showAllCategories ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default CategoryFilter;
