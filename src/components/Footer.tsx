import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="animate-fadeInUp">
            <button onClick={scrollToTop} className="text-3xl font-bold text-orange-500 hover:text-orange-400 transition-colors mb-4">
              Bella Cucina
            </button>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Bringing authentic Italian flavors to your table since 1999. Experience the true taste of Italy.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="animate-fadeInUp animation-delay-100">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#menu" className="text-gray-400 hover:text-orange-500 transition-colors">Menu</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-orange-500 transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-orange-500 transition-colors">Reviews</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-orange-500 transition-colors">Reservations</a>
              </li>
            </ul>
          </div>

          <div className="animate-fadeInUp animation-delay-200">
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="text-orange-500 flex-shrink-0 mt-1" />
                <span>123 Italian Street, Downtown District, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={20} className="text-orange-500 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-orange-500 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} className="text-orange-500 flex-shrink-0" />
                <a href="mailto:info@bellacucina.com" className="hover:text-orange-500 transition-colors">
                  info@bellacucina.com
                </a>
              </li>
            </ul>
          </div>

          <div className="animate-fadeInUp animation-delay-300">
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates and special offers
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2 flex-wrap">
            {currentYear} Bella Cucina. Made with <Heart className="text-red-500 fill-current" size={18} /> for food lovers.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
