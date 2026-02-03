import { Heart, Award, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Heart size={40} />,
      title: 'Made with Love',
      description: 'Every dish is prepared with passion and attention to detail'
    },
    {
      icon: <Award size={40} />,
      title: 'Award Winning',
      description: 'Recognized for excellence in authentic Italian cuisine'
    },
    {
      icon: <Users size={40} />,
      title: 'Family Tradition',
      description: 'Recipes passed down through generations of Italian chefs'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInLeft">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Chef preparing food"
                className="rounded-lg shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-8 rounded-lg shadow-xl">
                <p className="text-5xl font-bold">25+</p>
                <p className="text-lg">Years of Experience</p>
              </div>
            </div>
          </div>

          <div className="animate-fadeInRight">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
              About <span className="text-orange-500">Bella Cucina</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Welcome to Bella Cucina, where authentic Italian tradition meets modern culinary artistry.
              Our restaurant has been serving the finest Italian cuisine for over 25 years, bringing the
              taste of Italy to your table.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Led by Chef Giovanni Rossi, our kitchen uses only the freshest ingredients, many imported
              directly from Italy, to create dishes that honor traditional recipes while adding our own
              creative touch. Every meal is a celebration of Italian culture, family, and the joy of
              sharing good food.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-orange-500 flex justify-center mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
