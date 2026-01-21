'use client';

import { Category } from '@/types';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (slug: string) => void;
}

export default function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200/50"
    >
      <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-white">
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
        >
          Categories ({categories.length})
        </motion.h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <motion.tbody 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/50 divide-y divide-gray-200/50"
          >
            {categories.map((category, index) => (
              <motion.tr 
                key={category.slug} 
                variants={itemVariants}
                whileHover={{ 
                  backgroundColor: "rgba(249, 250, 251, 0.8)",
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {category.image && (
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow"
                    >
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </motion.div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="text-sm font-mono text-gray-600 bg-gray-100 px-3 py-1 rounded-lg"
                  >
                    {category.slug}
                  </motion.span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900">{category.title}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 max-w-md truncate">
                    {category.description}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onEdit(category)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete the category "${category.title}"?`)) {
                          onDelete(category.slug);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
}
