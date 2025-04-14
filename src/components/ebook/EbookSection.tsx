'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// Custom hook for client-side only rendering
const useClientOnly = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
};

const EbookSection = () => {
  const isClient = useClientOnly();
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const bookRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    'Step-by-step investment strategies',
    'Passive income generation methods',
    'Tax optimization techniques',
    'Retirement planning essentials',
    'Risk management approaches',
    'Market analysis frameworks',
    'Wealth mindset development',
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Handle book 3D hover effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bookRef.current && isHovering) {
        const rect = bookRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        
        // Set mouse position for book rotation
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  // Floating animation for the book
  useEffect(() => {
    if (bookRef.current && isClient) {
      // Create more dynamic floating animation for the book
      gsap.to(bookRef.current, {
        y: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Enhanced glow pulse effect
      gsap.to('.book-glow', {
        boxShadow: '0 0 40px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 128, 255, 0.4)',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // More dynamic page turning effect
      gsap.to('.book-page', {
        rotateY: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
        delay: (i) => i * 0.2
      });
      
      // Add floating elements animation
      gsap.to('.floating-element', {
        y: -10,
        x: 5,
        rotation: 5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      });
    }
  }, [isClient]);

  // Rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const featureVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const bookVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 50, 
        delay: 0.3 
      } 
    }
  };

  return (
    <section 
      ref={ref} 
      className="py-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#051622] to-black"></div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full" style={{ background: 'radial-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>
      
      {/* Circle decoration */}
      <div className="absolute left-0 top-1/4 w-64 h-64 rounded-full bg-cyan-900/10 blur-3xl"></div>
      <div className="absolute right-0 bottom-1/4 w-80 h-80 rounded-full bg-blue-900/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring" } },
            }}
            className="relative"
          >
            {/* Corner decoration */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-500/20 -ml-5 -mt-5"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyan-500/20 -mr-5 -mb-5"></div>
            
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ultimate Guide to 
              <br />
              <span className="gradient-text text-glow animate-pulse-glow">Financial Freedom</span>
            </h2>

            <p className="text-gray-300 mb-8 text-lg">
              Discover the secrets to building wealth, making smart
              investments, and achieving your financial goals with our
              comprehensive e-book.
            </p>

            {/* Enhanced bullet point list to match the screenshot */}
            <motion.ul
              className="space-y-3 mb-10"
              variants={listVariants}
              initial="hidden"
              animate={controls}
            >
              {features.slice(0, 5).map((item, index) => (
                <motion.li 
                  key={index} 
                  variants={itemVariants} 
                  className={`flex items-center space-x-3 transition-all duration-300`}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="flex-shrink-0"
                    animate={currentFeature === index ? 
                      { scale: [1, 1.2, 1], color: ["#00D7FF", "#00A2FF", "#00D7FF"] } : 
                      { scale: 1 }
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3.5 w-3.5 ${
                          currentFeature === index ? 'text-cyan-400' : 'text-cyan-500'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </motion.div>
                  <span className={`text-base ${
                    currentFeature === index ? 'text-cyan-400' : 'text-gray-300'
                  }`}>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            {/* Enhanced pricing section to match the screenshot */}
            <div className="flex flex-wrap items-center space-x-4 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={controls}
                variants={{
                  hidden: { scale: 0, x: -10 },
                  visible: { scale: 1, x: 0, transition: { type: "spring", delay: 0.6 } }
                }}
                className="flex flex-col"
              >
                <motion.span 
                  className="text-4xl font-bold text-cyan-400"
                  animate={{ 
                    textShadow: [
                      '0 0 5px rgba(0, 255, 255, 0.3)', 
                      '0 0 10px rgba(0, 255, 255, 0.5)', 
                      '0 0 5px rgba(0, 255, 255, 0.3)'
                    ] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ₹500
                </motion.span>
                <span className="text-gray-500 line-through text-sm">₹5000</span>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={controls}
                variants={{
                  hidden: { scale: 0 },
                  visible: { scale: 1, transition: { type: "spring", delay: 0.7 } }
                }}
                whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-black text-sm font-bold py-1.5 px-4 rounded-full"
              >
                90% OFF
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delay: 0.8 } }
                }}
                className="border-l border-gray-600 h-12 mx-3"
              ></motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.9 } }
                }}
                className="flex flex-col"
              >
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.svg 
                      key={star} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-yellow-400" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.3, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <span className="text-gray-400 text-xs">300+ happy readers</span>
              </motion.div>
            </div>

            {/* Enhanced CTA button with more advanced animation */}
            <motion.button
              className="button-gradient py-4 px-8 rounded-lg flex items-center justify-center space-x-2 text-white font-medium relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)' 
              }}
              whileTap={{ scale: 0.95 }}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1 } }
              }}
            >
              <motion.div
                animate={{ 
                  y: [0, -3, 0],
                  x: [0, 2, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 00-1.414-1.414L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Get Your Copy Now</span>
              </motion.div>
              
              {/* Enhanced button animations */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-500 to-blue-500 transition-opacity duration-500"
                style={{ mixBlendMode: 'overlay' }}
                initial={false}
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-cyan-400"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 0.7 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.button>
            
            {/* Guarantee section */}
            <motion.div
              className="mt-6 flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { delay: 1.1 } }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-400 text-sm">30-day money back guarantee</span>
            </motion.div>
          </motion.div>

          <motion.div
            ref={bookRef}
            className="relative flex justify-center items-center h-[500px]"
            initial="hidden"
            animate={controls}
            variants={bookVariants}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setMousePosition({ x: 0, y: 0 });
            }}
          >
            {/* Add floating elements behind the book */}
            {isClient && (
              <>
                <motion.div 
                  className="floating-element absolute -left-20 top-10 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="floating-element absolute -right-10 bottom-20 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div 
                  className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-cyan-900/5 to-blue-900/5 rounded-full blur-3xl"></div>
                </motion.div>
              </>
            )}
            
            {/* 3D Book Effect - Exact match to second image */}
            <motion.div 
              className="relative perspective-800 w-[380px] h-[500px] mx-auto"
              animate={{
                rotateY: isHovering ? mousePosition.x * 12 : 15, 
                rotateX: isHovering ? -mousePosition.y * 8 : -8,
                z: isHovering ? 10 : 0,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="book-container w-full h-full transform-style preserve-3d">
                {/* Blue page - positioned exactly as in second image */}
                <div className="absolute inset-0 rounded-lg bg-blue-600 transform translate-x-6 translate-y-4 -translate-z-6" 
                  style={{ width: '100%', height: '100%' }}></div>
                
                {/* Cyan page - positioned exactly as in second image */}
                <div className="absolute inset-0 rounded-lg bg-cyan-400 transform -translate-x-6 -translate-y-6 -translate-z-3" 
                  style={{ width: '100%', height: '100%' }}></div>
                
                {/* Main book cover */}
                <div className="absolute inset-0 bg-[#080f18] rounded-lg overflow-hidden transform-style preserve-3d" 
                  style={{
                    boxShadow: '0 0 15px rgba(0, 217, 255, 0.4)',
                    border: '1px solid rgba(0, 217, 255, 0.3)'
                  }}>
                  
                  {/* Cover Design - Exact match to second image */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#080f18]">
                    {/* Cyan top bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-400"></div>
                    
                    {/* Document icon - exact match */}
                    <motion.div className="mb-8">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 text-cyan-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </motion.div>
                    
                    {/* Title text with exact styling from second image */}
                    <h3 className="text-xl tracking-wider font-medium mb-1 text-white">Ultimate Guide to</h3>
                    <div className="text-4xl tracking-wide font-bold mb-6 text-cyan-400"
                      style={{ letterSpacing: '0.02em', textShadow: '0 0 15px rgba(56, 189, 248, 0.5)' }}>
                      Financial Freedom
                    </div>
                    
                    <div className="w-16 h-0.5 bg-cyan-400 my-3"></div>
                    
                    <p className="text-sm text-gray-400 mb-10 font-light">By Investment Companion</p>
                    
                    <div 
                      className="mt-4 px-6 py-2 bg-[#021825] rounded-full text-cyan-400 text-sm border border-cyan-500/30"
                      style={{ boxShadow: '0 0 10px rgba(56, 189, 248, 0.2)' }}
                    >
                      230+ Pages of Expert Advice
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Glow effect below - exact match to second image */}
            <motion.div 
              className="absolute -bottom-8 w-64 h-6 bg-cyan-400 opacity-30 blur-xl rounded-full"
              animate={{ 
                scaleX: [1, 1.2, 1], 
                opacity: [0.2, 0.3, 0.2],
                width: ['50%', '60%', '50%']
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            ></motion.div>
            
            {/* Light effect around the book - exact match to second image */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 rounded-3xl opacity-15 blur-xl"
                style={{
                  background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
                  transform: 'scale(1.3)'
                }}
              ></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EbookSection; 