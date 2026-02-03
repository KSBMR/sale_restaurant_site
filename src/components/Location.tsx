import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

const Location = () => {
  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex justify-center mb-4">
            <MapPin className="text-orange-500" size={48} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Visit Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find us at the heart of the city, ready to welcome you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-fadeInLeft">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h3>

              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-500 transition-colors duration-300">
                    <MapPin className="text-orange-500 group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800 mb-1">Address</h4>
                    <p className="text-gray-600">
                      123 Italian Street<br />
                      Downtown District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-500 transition-colors duration-300">
                    <Phone className="text-orange-500 group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                    <a href="tel:+15551234567" className="text-gray-600 hover:text-orange-500 transition-colors">
                      (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-500 transition-colors duration-300">
                    <Mail className="text-orange-500 group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                    <a href="mailto:info@bellacucina.com" className="text-gray-600 hover:text-orange-500 transition-colors">
                      info@bellacucina.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Navigation size={20} />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          <div className="animate-fadeInRight">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830894612!2d-74.11976373946234!3d40.69766374859258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
