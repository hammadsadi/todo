"use client";

import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "How to Master React in 2025",
    excerpt:
      "Discover the latest tips, tools, and practices to become a React pro this year.",
    date: "May 10, 2025",
    readTime: "6 min read",
    image:
      "https://files.selar.co/product-images/2024/products/Viclabulary/project-management-selar.co-65f60d5694847.jpg",
  },
  {
    id: 2,
    title: "10 Tips for Writing Clean JavaScript",
    excerpt:
      "Keep your code maintainable and readable with these simple but effective tips.",
    date: "April 22, 2025",
    readTime: "4 min read",
    image:
      "https://files.selar.co/product-images/2024/products/Viclabulary/project-management-selar.co-65f60d5694847.jpg",
  },
  {
    id: 3,
    title: "Understanding Tailwind CSS Deeply",
    excerpt:
      "A complete guide to unlocking the full power of Tailwind CSS for your projects.",
    date: "March 15, 2025",
    readTime: "5 min read",
    image:
      "https://files.selar.co/product-images/2024/products/Viclabulary/project-management-selar.co-65f60d5694847.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotate: -2, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
  hover: {
    scale: 1.03,
    rotate: 1,
    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function BlogSection() {
  return (
    <section className="py-16 px-6 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 border-b-4 border-primary inline-block pb-2">
          Latest Blog Posts
        </h2>

        <motion.div
          className="grid md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogs.map((blog) => (
            <motion.article
              key={blog.id}
              className=" backdrop-blur-3xl rounded-lg overflow-hidden shadow-lg cursor-pointer select-none transform transition-all bg-gray-100 dark:bg-[#09090b] border  dark:text-gray-300 text-gray-900"
              variants={cardVariants}
              whileHover="hover"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold">{blog.title}</h3>
                <p className="dark:text-gray-200 text-sm">{blog.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-primary pt-2">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
