import { Search } from "lucide-react";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-white">Book List App</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search books, authors, countries"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-80"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
