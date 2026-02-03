import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Food Critic',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'Absolutely phenomenal! The pasta was cooked to perfection, and the authentic flavors transported me straight to Italy. Best Italian restaurant in town!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Regular Customer',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'The ambiance is perfect for a romantic dinner, and the service is impeccable. The tiramisu is to die for! We come here every anniversary.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Travel Blogger',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'Having traveled extensively through Italy, I can confidently say Bella Cucina captures the essence of true Italian cuisine. Simply outstanding!',
      rating: 5
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Business Executive',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'We hosted a business dinner here and everyone was impressed. The food quality, presentation, and service exceeded all expectations.',
      rating: 5
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'Local Resident',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'A hidden gem! The family atmosphere, delicious food, and reasonable prices make this our go-to spot for Italian cuisine.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex justify-center mb-4">
            <Quote className="text-orange-500" size={48} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Customer <span className="text-orange-500">Reviews</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear what our customers have to say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-3 rounded-full">
                <Quote size={24} />
              </div>

              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-orange-500"
                />
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-orange-50 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <p className="text-5xl font-bold text-orange-500">500+</p>
                <p className="text-gray-600 mt-2">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold text-orange-500">4.9</p>
                <p className="text-gray-600 mt-2">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold text-orange-500">250+</p>
                <p className="text-gray-600 mt-2">Five Star Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
