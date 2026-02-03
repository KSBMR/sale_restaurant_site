import { Tag, Clock, Gift } from 'lucide-react';

const SpecialOffers = () => {
  const offers = [
    {
      icon: <Tag size={40} />,
      title: 'Happy Hour',
      subtitle: 'Monday - Friday, 4PM - 6PM',
      description: '25% off all appetizers and selected drinks',
      badge: 'Limited Time'
    },
    {
      icon: <Clock size={40} />,
      title: 'Lunch Special',
      subtitle: 'Weekdays, 12PM - 3PM',
      description: 'Get a main course, drink and dessert for just $19.99',
      badge: 'Best Value'
    },
    {
      icon: <Gift size={40} />,
      title: 'Family Feast',
      subtitle: 'Weekends Only',
      description: 'Special family platter serving 4-6 people at 20% discount',
      badge: 'Popular'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Special <span className="text-orange-500">Offers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take advantage of our exclusive deals and promotions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {offer.badge}
              </div>
              <div className="text-orange-500 mb-4">
                {offer.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{offer.title}</h3>
              <p className="text-sm text-orange-500 font-semibold mb-4">{offer.subtitle}</p>
              <p className="text-gray-600 leading-relaxed">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
