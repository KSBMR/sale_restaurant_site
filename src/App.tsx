import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import SpecialOffers from './components/SpecialOffers';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import OpeningHours from './components/OpeningHours';
import Location from './components/Location';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation />
      <Hero />
      <Menu />
      <About />
      <SpecialOffers />
      <Gallery />
      <Testimonials />
      <OpeningHours />
      <Location />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
