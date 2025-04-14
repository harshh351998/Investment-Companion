'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FormEvent, useState, useRef } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setIsValid(false);
      emailRef.current?.focus();
      return;
    }
    
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }
    
    // Add newsletter subscription logic here
    setIsSubscribed(true);
    setEmail('');
    setIsValid(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value === '') {
      setIsValid(true);
    } else {
      setIsValid(validateEmail(e.target.value));
    }
  };
  
  const footerLinks = [
    {
      title: 'Courses',
      links: [
        { name: 'All Courses', href: '/courses' },
        { name: 'Investment Fundamentals', href: '/courses/investment-fundamentals' },
        { name: 'Advanced Stock Trading', href: '/courses/advanced-stock-trading' },
        { name: 'Financial Independence', href: '/courses/financial-independence' },
        { name: 'Course FAQ', href: '/courses/faq' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'E-Book', href: '/e-book' },
        { name: 'Blog', href: '/blog' },
        { name: 'Podcast', href: '/podcast' },
        { name: 'Free Tools', href: '/tools' },
        { name: 'Investor Dictionary', href: '/dictionary' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'About the Founder', href: '/about/founder' },
        { name: 'Our Mission', href: '/about/mission' },
        { name: 'Contact', href: '/contact' },
        { name: 'Support', href: '/support' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Disclaimer', href: '/disclaimer' }
      ]
    }
  ];
  
  const socialLinks = [
    { name: 'Facebook', icon: 'F', href: '#' },
    { name: 'Twitter', icon: 'T', href: '#' },
    { name: 'LinkedIn', icon: 'L', href: '#' },
    { name: 'Instagram', icon: 'I', href: '#' },
    { name: 'YouTube', icon: 'Y', href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-b from-[#051622] to-black py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-800/30 to-transparent"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ 
            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Glow spots */}
        <div className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-cyan-900/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 w-72 h-72 rounded-full bg-blue-900/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and company info */}
          <motion.div 
            className="space-y-6 col-span-1 md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block">
              <div className="flex items-center space-x-3 hover:scale-105 transition duration-300">
                <div className="relative h-16 w-16 footer-logo-container" style={{ transformStyle: 'preserve-3d' }}>
                  <Image 
                    src="/logo.png" 
                    alt="Investment Companion Logo"
                    width={64}
                    height={64}
                    className="footer-logo-animation footer-logo-glow"
                    style={{ 
                      objectFit: 'contain',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      
                    
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="gradient-text">Investment</span>
                  </h1>
                  <p className="text-white text-base font-medium -mt-1">Companion</p>
                </div>
              </div>
            </Link>
            
            <div className="text-gray-400 text-sm max-w-xs">
              Your trusted partner on the journey to financial 
              independence. Expert guidance, practical courses, and
              valuable resources to help you achieve your financial
              goals.
            </div>

            <div className="space-y-1">
              <h3 className="text-white font-medium mb-2">About the Founder</h3>
              <p className="text-gray-400 text-sm">
                Investment Companion was founded by <span className="text-cyan-400 font-medium">Harsh Mendapara</span>, a
                passionate investor and financial educator dedicated to making 
                investment knowledge accessible to everyone.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.name}
                  className="w-9 h-9 rounded-full bg-[#081e28] flex items-center justify-center text-white hover:bg-gradient-to-br from-cyan-500 to-blue-500 transition-colors"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 8px rgba(0, 255, 255, 0.5)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link sections */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {footerLinks.slice(0, 2).map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (sectionIndex + 1), duration: 0.5 }}
                >
                  <h3 className="text-white font-medium relative inline-block">
                    {section.title}
                    <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <motion.li 
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * (linkIndex + 1) + 0.2 * sectionIndex, duration: 0.3 }}
                      >
                        <Link 
                          href={link.href} 
                          className="text-gray-400 hover:text-cyan-400 transition-colors text-sm inline-block py-1 group"
                        >
                          <span className="relative">
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Newsletter subscription */}
          <motion.div
            className="lg:col-span-1 md:col-span-2 col-span-1 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-white font-medium mb-3 relative inline-block">
              Subscribe to Our Newsletter
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            </h3>
            <p className="text-gray-400 text-sm">
              Stay updated with the latest financial insights, course
              launches, and exclusive offers.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Your email address"
                  className={`w-full bg-[#081e28] border ${
                    !isValid ? 'border-red-500' : isFocused ? 'border-cyan-500' : 'border-gray-700'
                  } rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all duration-300`}
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                />
                <AnimatePresence>
                  {!isValid && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-xs mt-1 absolute"
                    >
                      Please enter a valid email address
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
                }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubscribed}
              >
                <AnimatePresence mode="wait">
                  {isSubscribed ? (
                    <motion.div
                      key="subscribed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Subscribed!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="subscribe"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      Subscribe
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Button background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 animate-gradient"></div>
              </motion.button>
            </form>
            
            <div className="space-y-4 mt-8">
              {footerLinks.slice(2).map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (sectionIndex + 3), duration: 0.5 }}
                >
                  <h3 className="text-white font-medium relative inline-block">
                    {section.title}
                    <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                  </h3>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {section.links.map((link, linkIndex) => (
                      <motion.li 
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * (linkIndex + 1) + 0.3 * sectionIndex, duration: 0.3 }}
                      >
                        <Link 
                          href={link.href} 
                          className="text-gray-400 hover:text-cyan-400 transition-colors text-sm group inline-block"
                        >
                          <span className="relative">
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Investment Companion. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-6">
            {[
              'Terms of Service',
              'Privacy Policy',
              'Cookie Policy',
              'Disclaimer',
            ].map((item, index) => (
              <Link 
                key={index}
                href="#" 
                className="text-gray-500 hover:text-cyan-400 transition-colors text-sm group"
              >
                <span className="relative">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 