import { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      url: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1200',
      caption: 'Our Signature Pasta Dishes'
    },
    {
      url: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1200',
      caption: 'Cozy Dining Atmosphere'
    },
    {
      url: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=1200',
      caption: 'Fresh Wood-Fired Pizzas'
    },
    {
      url: 'https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1200',
      caption: 'Elegant Restaurant Interior'
    },
    {
      url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1200',
      caption: 'Artisanal Desserts'
    }
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="gallery" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex justify-center mb-4">
            <Camera className="text-orange-500" size={48} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A visual journey through our culinary creations and ambiance
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            <div className="relative h-[500px] overflow-hidden rounded-xl shadow-2xl">
              <img
                src={images[currentIndex].url}
                alt={images[currentIndex].caption}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                <p className="text-white text-2xl font-semibold">
                  {images[currentIndex].caption}
                </p>
              </div>
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-orange-500'
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-32 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                index === currentIndex ? 'ring-4 ring-orange-500' : ''
              }`}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
