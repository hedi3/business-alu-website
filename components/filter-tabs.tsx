"use client"

import { motion } from "framer-motion"

interface Category {
  id: string
  label: string
}

interface FilterTabsProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function FilterTabs({ categories, activeCategory, onCategoryChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 font-sans">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`relative px-6 py-3 text-sm md:text-base font-medium transition-colors duration-300 ${
            activeCategory === category.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {category.label}
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
