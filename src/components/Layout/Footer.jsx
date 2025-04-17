import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-50 pt-16 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <span className="text-primary font-bold text-2xl">MindfulAI</span>
            </Link>
            <p className="mt-4 text-secondary-text max-w-md">
              Your AI companion for mental wellness. Track moods, journal your thoughts,
              and receive personalized insights to improve your mental well-being.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-primary hover:text-primary-600 transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-primary hover:text-primary-600 transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-primary hover:text-primary-600 transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#hero" className="text-secondary-text hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#mood-log" className="text-secondary-text hover:text-primary transition-colors">Track Mood</a>
              </li>
              <li>
                <a href="#assessment" className="text-secondary-text hover:text-primary transition-colors">Assessment</a>
              </li>
              <li>
                <a href="#journal" className="text-secondary-text hover:text-primary transition-colors">Journal</a>
              </li>
              <li>
                <a href="#chat" className="text-secondary-text hover:text-primary transition-colors">AI Chat</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-secondary-text hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-secondary-text hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-secondary-text hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-secondary-text hover:text-primary transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-secondary-text hover:text-primary transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-100 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-text text-sm">
              © {currentYear} MindfulAI. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-secondary-text hover:text-primary text-sm transition-colors">Privacy</a>
                </li>
                <li>
                  <a href="#" className="text-secondary-text hover:text-primary text-sm transition-colors">Terms</a>
                </li>
                <li>
                  <a href="#" className="text-secondary-text hover:text-primary text-sm transition-colors">Cookies</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;