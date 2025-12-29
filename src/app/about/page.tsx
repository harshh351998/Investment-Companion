'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <section className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold mb-6 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="gradient-text">About Investment Companion</span>
              <div className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 w-full"></div>
            </motion.h1>
            <motion.p 
              className="text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Empowering individuals to achieve financial freedom through expert guidance and practical education.
            </motion.p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-gray-300 text-lg mb-4">
                At Investment Companion, we believe that financial education should be accessible to everyone. 
                Our mission is to demystify the world of investing and provide practical, actionable guidance that 
                helps individuals build wealth and achieve financial independence.
              </p>
              <p className="text-gray-300 text-lg">
                We're committed to making complex financial concepts simple, understandable, and applicable to 
                your everyday life.
              </p>
            </motion.div>
            <motion.div
              className="relative h-64 lg:h-80 rounded-lg overflow-hidden glass-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📈</div>
                  <p className="text-cyan-400 font-semibold">Financial Growth</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Founder Section */}
          <div className="mb-16">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-white">
                Founded by <span className="gradient-text">Harsh Mendapara</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A passionate advocate for financial literacy, dedicated to making investing knowledge accessible to everyone.
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto glass-card p-8 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-500/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-3">Harsh Mendapara</h3>
                  <p className="text-gray-300 mb-4">
                    With years of experience in the financial industry, Harsh founded Investment Companion 
                    to bridge the gap between complex financial concepts and everyday investors. His vision 
                    is to create a platform where anyone, regardless of their background, can learn to make 
                    informed investment decisions.
                  </p>
                  <p className="text-gray-300">
                    Through comprehensive courses, expert guidance, and valuable resources, Investment Companion 
                    is transforming how people approach their financial future.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: '🎯',
                title: 'Accessibility',
                description: 'Making financial education available to everyone, regardless of their background or experience level.'
              },
              {
                icon: '💡',
                title: 'Expertise',
                description: 'Providing insights and strategies from experienced professionals in the financial industry.'
              },
              {
                icon: '🚀',
                title: 'Practicality',
                description: 'Focusing on actionable advice that you can apply immediately to improve your financial situation.'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="glass-card p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 255, 255, 0.3)' }}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center glass-card p-12 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Start Your <span className="gradient-text">Financial Journey?</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are taking control of their financial future with Investment Companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/courses"
                className="button-gradient py-3 px-8 rounded-md text-white font-medium inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Courses
              </motion.a>
              <motion.a
                href="/e-book"
                className="border border-cyan-400 hover:bg-cyan-900/20 transition-all py-3 px-8 rounded-md text-cyan-400 font-medium inline-block"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get E-Book
              </motion.a>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

