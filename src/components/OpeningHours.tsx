import { Clock } from 'lucide-react';

const OpeningHours = () => {
  const hours = [
    { day: 'Monday', time: '11:00 AM - 10:00 PM', isOpen: true },
    { day: 'Tuesday', time: '11:00 AM - 10:00 PM', isOpen: true },
    { day: 'Wednesday', time: '11:00 AM - 10:00 PM', isOpen: true },
    { day: 'Thursday', time: '11:00 AM - 10:00 PM', isOpen: true },
    { day: 'Friday', time: '11:00 AM - 11:00 PM', isOpen: true },
    { day: 'Saturday', time: '10:00 AM - 11:00 PM', isOpen: true },
    { day: 'Sunday', time: '10:00 AM - 9:00 PM', isOpen: true }
  ];

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="flex justify-center mb-4">
              <Clock className="text-orange-500" size={48} />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Opening Hours
            </h2>
            <p className="text-xl text-gray-300">
              We're here to serve you delicious Italian cuisine
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {hours.map((schedule, index) => (
              <div
                key={schedule.day}
                className={`flex justify-between items-center p-6 transition-all duration-300 hover:bg-orange-50 animate-fadeInUp ${
                  currentDay === schedule.day ? 'bg-orange-500 text-white' : 'text-gray-800'
                } ${index !== hours.length - 1 ? 'border-b border-gray-200' : ''}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center">
                  <span className={`font-bold text-lg ${currentDay === schedule.day ? 'text-white' : 'text-gray-800'}`}>
                    {schedule.day}
                  </span>
                  {currentDay === schedule.day && (
                    <span className="ml-3 bg-white text-orange-500 px-3 py-1 rounded-full text-xs font-semibold">
                      Today
                    </span>
                  )}
                </div>
                <span className={`font-semibold ${currentDay === schedule.day ? 'text-white' : 'text-gray-600'}`}>
                  {schedule.time}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-300 text-lg">
              For reservations or inquiries, call us at{' '}
              <a href="tel:+15551234567" className="text-orange-500 font-bold hover:text-orange-400 transition-colors">
                (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpeningHours;
