const { useState, useEffect } = React;

    const HotelBookingApp = () => {
      const [searchParams, setSearchParams] = useState({
        location: '',
        checkIn: '',
        checkOut: '',
        guests: 1
      });
      const [activeFilter, setActiveFilter] = useState('All');
      const [hotels, setHotels] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [selectedHotel, setSelectedHotel] = useState(null);
      const [showModal, setShowModal] = useState(false);

      // Mock data fetching
      useEffect(() => {
        const mockHotels = [
          {
            id: 1,
            name: "The Grand Plaza",
            location: "New York",
            price: 250,
            rating: 4.8,
            image: "https://placehold.co/600x400?text=Grand+Plaza",
            type: "Luxury",
            description: "Experience luxury at its finest with breathtaking views of the Manhattan skyline. Our award-winning hotel features world-class amenities and exceptional service.",
            amenities: ["Free WiFi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant"],
            rooms: ["Deluxe Room", "Executive Suite", "Presidential Suite"]
          },
          {
            id: 2,
            name: "Oceanview Resort",
            location: "Miami",
            price: 180,
            rating: 4.5,
            image: "https://placehold.co/600x400?text=Oceanview",
            type: "Beach",
            description: "Wake up to the sound of waves at our beachfront paradise. Perfect for families and couples looking for a relaxing getaway.",
            amenities: ["Private Beach", "Poolside Bar", "Kids Club", "Water Sports", "Beachfront Dining"],
            rooms: ["Ocean View Room", "Beachfront Suite", "Family Suite"]
          },
          {
            id: 3,
            name: "Mountain Retreat",
            location: "Denver",
            price: 120,
            rating: 4.3,
            image: "https://placehold.co/600x400?text=Mountain",
            type: "Adventure",
            description: "Nestled in the Rocky Mountains, our lodge offers the perfect basecamp for outdoor enthusiasts and nature lovers.",
            amenities: ["Hiking Trails", "Hot Tub", "Fireplace", "Guided Tours", "Ski Storage"],
            rooms: ["Mountain View Room", "Chalet", "Log Cabin"]
          },
          {
            id: 4,
            name: "Urban Loft Hotel",
            location: "Chicago",
            price: 220,
            rating: 4.7,
            image: "https://placehold.co/600x400?text=Urban+Loft",
            type: "Boutique",
            description: "Stylish and contemporary boutique hotel in the heart of downtown Chicago. Perfect for business travelers and urban explorers.",
            amenities: ["Business Center", "Roof Deck", "Art Gallery", "Coffee Bar", "24/7 Concierge"],
            rooms: ["Loft Room", "Studio Suite", "Designer Suite"]
          }
        ];
        
        setTimeout(() => {
          setHotels(mockHotels);
          setIsLoading(false);
        }, 1000);
      }, []);

      const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
          ...prev,
          [name]: value
        }));
      };

      const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching with:', searchParams);
      };

      const handleBookNow = (hotel) => {
        setSelectedHotel(hotel);
        setShowModal(true);
      };

      const closeModal = () => {
        setShowModal(false);
        setSelectedHotel(null);
      };

      const filteredHotels = activeFilter === 'All' 
        ? hotels 
        : hotels.filter(hotel => hotel.type === activeFilter);

      const hotelTypes = ['All', 'Luxury', 'Beach', 'Adventure', 'Boutique'];

      return (
        <div className="min-h-screen">
          {/* Hero Section */}
          <div className="relative bg-blue-600 text-white pb-20">
            <div className="container mx-auto px-4 py-20">
              <h1 className="text-4xl font-bold mb-2">Find Your Perfect Stay</h1>
              <p className="text-xl mb-8">Discover the best hotels at unbeatable prices</p>
              
              {/* Search Box */}
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                <form onSubmit={handleSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-gray-800 text-sm font-bold mb-2">Destination</label>
                      <input
                        type="text"
                        name="location"
                        value={searchParams.location}
                        onChange={handleSearchChange}
                        placeholder="Where are you going?"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-800 text-sm font-bold mb-2">Check-in</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={searchParams.checkIn}
                        onChange={handleSearchChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-800 text-sm font-bold mb-2">Check-out</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={searchParams.checkOut}
                        onChange={handleSearchChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-800 text-sm font-bold mb-2">Guests</label>
                      <input
                        type="number"
                        name="guests"
                        min="1"
                        value={searchParams.guests}
                        onChange={handleSearchChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                      Search Hotels
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-10">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              {hotelTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-full ${activeFilter === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Hotels Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHotels.map(hotel => (
                  <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                    <div className="relative">
                      <img 
                        src={hotel.image} 
                        alt={`${hotel.name} hotel in ${hotel.location}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                        {hotel.type}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{hotel.name}</h3>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{hotel.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{hotel.location}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xl font-bold text-blue-600">${hotel.price}<span className="text-sm font-normal text-gray-500"> /night</span></p>
                        <button 
                          onClick={() => handleBookNow(hotel)}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Booking Modal */}
          {showModal && selectedHotel && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                  <img 
                    src={selectedHotel.image} 
                    alt={`${selectedHotel.name} hotel`}
                    className="w-full h-64 object-cover"
                  />
                  <button 
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{selectedHotel.name}</h2>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-lg">{selectedHotel.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">
                    <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {selectedHotel.location}
                  </p>
                  <p className="text-gray-800 mb-4">{selectedHotel.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Price: <span className="text-blue-600">${selectedHotel.price}</span> per night</h3>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Your Dates:</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-1">Check-in</label>
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-1">Check-out</label>
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1">Guests</label>
                        <input
                          type="number"
                          min="1"
                          defaultValue="1"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Room Options</h3>
                    <div className="space-y-3">
                      {selectedHotel.rooms.map((room, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium">{room}</p>
                          </div>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm transition duration-300">
                            Select
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedHotel.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Hotel Booking</h3>
                  <p className="text-gray-400">
                    Find your perfect stay with our selection of hotels worldwide.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Explore</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Destinations</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Deals</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Travel Guides</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">News</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Support</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Hotel Booking App. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      );
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<HotelBookingApp />);