'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import CourseCard from './CourseCard';
import Link from 'next/link';
import gsap from 'gsap';

const courses = [
  {
    id: 1,
    title: 'Investment Fundamentals',
    description: 'Learn the basics of investing and build a strong foundation for your financial future.',
    icon: '/icons/investment.svg',
    rating: 4.9,
    price: 'Free',
    isPopular: true,
    categories: ['featured', 'investment']
  },
  {
    id: 2,
    title: 'Advanced Stock Trading',
    description: 'Master the art of stock trading with advanced strategies and techniques.',
    icon: '/icons/stock.svg',
    rating: 4.8,
    price: 'Free',
    categories: ['featured', 'stock']
  },
  {
    id: 3,
    title: 'Cryptocurrency Investing',
    description: 'Understand blockchain technology and make informed decisions in crypto markets.',
    icon: '/icons/crypto.svg',
    rating: 4.6,
    price: 'Free',
    categories: ['crypto']
  },
  {
    id: 4,
    title: 'Real Estate Investment',
    description: 'Discover strategies for building wealth through real estate investments.',
    icon: '/icons/investment.svg',
    rating: 4.7,
    price: 'Free',
    categories: ['real-estate', 'investment']
  },
  {
    id: 5,
    title: 'Financial Freedom Blueprint',
    description: 'Create a comprehensive plan to achieve financial independence and freedom.',
    icon: '/icons/stock.svg',
    rating: 4.9,
    price: 'Free',
    isPopular: true,
    categories: ['featured', 'financial']
  },
  {
    id: 6,
    title: 'Trading Psychology',
    description: 'Master your emotions and develop the mindset of successful traders.',
    icon: '/icons/crypto.svg',
    rating: 4.5,
    price: 'Free',
    categories: ['stock', 'trading']
  }
];

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'featured', name: 'Featured' },
  { id: 'investment', name: 'Investment' },
  { id: 'stock', name: 'Stock Trading' },
  { id: 'financial', name: 'Financial Freedom' },
  { id: 'crypto', name: 'Cryptocurrency' },
  { id: 'real-estate', name: 'Real Estate' }
];

const CoursesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  // Background shape animation
  const bgShapesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (bgShapesRef.current) {
      const shapes = gsap.utils.toArray<HTMLElement>('.bg-shape');
      
      shapes.forEach((shape) => {
        gsap.to(shape, {
          y: gsap.utils.random(-20, 20),
          x: gsap.utils.random(-20, 20),
          rotate: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(15, 30),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, []);
  
  // Filter courses when active category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(course => 
        course.categories.includes(activeCategory)
      ));
    }
  }, [activeCategory]);
  
  // Animate section when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.6
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black bg-opacity-90 z-0"></div>
      <div 
        ref={bgShapesRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <div className="bg-shape absolute left-10 top-20 w-64 h-64 rounded-full bg-cyan-900/5 blur-3xl"></div>
        <div className="bg-shape absolute right-20 bottom-40 w-80 h-80 rounded-full bg-blue-900/5 blur-3xl"></div>
        <div className="bg-shape absolute right-1/4 top-1/4 w-40 h-40 rounded-full bg-indigo-900/10 blur-3xl"></div>
        
        {/* Decorative grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16 relative"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"
            variants={titleVariants}
          ></motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-4 relative inline-block"
            variants={titleVariants}
          >
            <span className="gradient-text">Explore Our Courses</span>
            <motion.div 
              className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 w-0"
              animate={{ width: isInView ? '100%' : '0%' }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto relative"
            variants={titleVariants}
          >
            Discover expert-led courses designed to help you master investing, trading, and financial independence.
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          {categories.map((category, i) => (
            <motion.button
              key={category.id}
              custom={i}
              variants={categoryVariants}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category.id 
                ? 'glass-card bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                : 'bg-gray-800/40 text-gray-300 hover:bg-gray-700/50 border border-transparent'
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <CourseCard 
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  icon={course.icon}
                  rating={course.rating}
                  price={course.price}
                  isPopular={course.isPopular}
                  delay={0.1 * (index + 1)}
                />
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-400 text-xl">No courses found in this category yet.</p>
                <button 
                  className="mt-4 text-cyan-400 border border-cyan-400 px-4 py-2 rounded-md hover:bg-cyan-400/10 transition-colors"
                  onClick={() => setActiveCategory('all')}
                >
                  View all courses
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5, delay: 0.6 }
            }
          }}
        >
          <Link href="/courses">
            <motion.button 
              className="inline-flex items-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/30 px-6 py-3 rounded-lg group glass-hover"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="gradient-text font-medium mr-2">Explore Course Catalog</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-cyan-400" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </motion.svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection; 