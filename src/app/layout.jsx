import { Inter, Poppins } from 'next/font/google';
import { Analytics } from '@/components/Analytics';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { SmoothScrollProvider } from '@/lib/smoothScroll';
import '@/styles/globals.css';

// Font setup
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'MindfulAI - AI-Powered Mental Wellness Assistant',
  description: 'Track moods, journal thoughts, and receive personalized insights with our AI-powered mental wellness companion.',
  keywords: 'mental health, wellness, AI assistant, mood tracking, journaling, self-assessment',
  viewport: 'width=device-width, initial-scale=1.0',
  themeColor: '#a78bfa',
  openGraph: {
    title: 'MindfulAI - AI-Powered Mental Wellness Assistant',
    description: 'Your personal AI companion for mental wellness and self-discovery',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MindfulAI Preview Image',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-light-bg text-primary-text">
        <SmoothScrollProvider options={{ smooth: true, lerp: 0.1 }}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}