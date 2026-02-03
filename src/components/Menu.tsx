import { Utensils } from 'lucide-react';

const Menu = () => {
  const menuItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato sauce, basil, and extra virgin olive oil',
      price: '$14.99',
      image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Main Course'
    },
    {
      id: 2,
      name: 'Spaghetti Carbonara',
      description: 'Classic Roman pasta with eggs, pecorino cheese, and guanciale',
      price: '$16.99',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Main Course'
    },
    {
      id: 3,
      name: 'Tiramisu',
      description: 'Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone',
      price: '$8.99',
      image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Dessert'
    },
    {
      id: 4,
      name: 'Bruschetta',
      description: 'Toasted bread topped with fresh tomatoes, garlic, and basil',
      price: '$9.99',
      image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Appetizer'
    },
    {
      id: 5,
      name: 'Risotto ai Funghi',
      description: 'Creamy risotto with porcini mushrooms and parmesan',
      price: '$18.99',
      image: 'https://images.pexels.com/photos/9609843/pexels-photo-9609843.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Main Course'
    },
    {
      id: 6,
      name: 'Caprese Salad',
      description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
      price: '$12.99',
      image: 'https://images.pexels.com/photos/1435903/pexels-photo-1435903.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Appetizer'
    }
  ];

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex justify-center mb-4">
            <Utensils className="text-orange-500" size={48} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Our Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our selection of authentic Italian dishes, made with the finest ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
                  <span className="text-2xl font-bold text-orange-500">{item.price}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
