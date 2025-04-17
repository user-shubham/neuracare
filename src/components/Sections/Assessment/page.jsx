import React from 'react';
import Assessment from '../../components/Sections/Assessment';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export const metadata = {
  title: 'Self-Assessment | Mind Wellness',
  description: 'Take our self-assessment quizzes to understand your mental well-being and get personalized suggestions for improvement.'
};

export default function AssessmentPage() {
  return (
    <>
      <Header />
      <main>
        <Assessment />
      </main>
      <Footer />
    </>
  );
}