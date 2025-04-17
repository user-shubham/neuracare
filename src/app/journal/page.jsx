import Journal from '@/components/Sections/Journal';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export const metadata = {
  title: 'Journal | Mind Wellness',
  description: 'Track your thoughts and feelings with your personal journal.'
};

export default function JournalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">My Journal</h1>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            Use this space to express your thoughts and feelings. Regular journaling can help you 
            process emotions, gain insights, and track your mental wellness journey.
          </p>
          <Journal />
        </div>
      </main>
      <Footer />
    </>
  );
}