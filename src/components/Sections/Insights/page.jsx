// src/app/insights/page.jsx
import { motion } from 'framer-motion';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import InsightsSection from '../../components/Sections/Insights';

export default function InsightsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <section className="pt-20 pb-6 bg-blue-50">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">Your Wellness Insights</h1>
              <p className="text-gray-600 text-center max-w-2xl mx-auto">
                Discover patterns and trends in your mental wellness journey based on your tracked data and journal entries.
              </p>
            </div>
          </section>
          
          <InsightsSection />
          
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How To Use Your Insights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Identify Patterns</h3>
                  <p className="text-gray-600">
                    Look for recurring themes in your mood data. What activities, people, or situations consistently appear during your high or low moods?
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Track Progress</h3>
                  <p className="text-gray-600">
                    Monitor how your mental wellness metrics change over time. Celebrate improvements and explore what might be contributing to them.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Create Action Plans</h3>
                  <p className="text-gray-600">
                    Use your personalized insights to develop specific strategies for managing challenging situations and enhancing your well-being.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}