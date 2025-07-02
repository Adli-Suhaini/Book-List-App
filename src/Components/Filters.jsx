import { Filter } from "lucide-react";

const Filters = ({ books, filters, setFilters }) => {
  const countries = [...new Set(books.map((book) => book.country))].sort();
  const languages = [...new Set(books.map((book) => book.language))].sort();

  // To get century from year
  const getCentury = (year) => {
    if (year < 0) {
      // For -ve years
      return Math.ceil(Math.abs(year) / 100) * -1;
    } else {
      // For +ve years
      return Math.ceil(year / 100);
    }
  };

  // To format century display
  const formatCentury = (century) => {
    if (century < 0) {
      return `${Math.abs(century)}th century BCE`;
    } else {
      const suffix =
        century === 1
          ? "st"
          : century === 2
          ? "nd"
          : century === 3
          ? "rd"
          : "th";
      return `${century}${suffix} century CE`;
    }
  };

  // To get page range
  const getPageRange = (pages) => {
    return Math.ceil(pages / 100);
  };

  // To format page range display
  const formatPageRange = (range) => {
    const start = (range - 1) * 100 + 1;
    const end = range * 100;
    return `${start}-${end} pages`;
  };

  const centuries = [
    ...new Set(books.map((book) => getCentury(book.year))),
  ].sort((a, b) => a - b);

  const pageRanges = [
    ...new Set(books.map((book) => getPageRange(book.pages))),
  ].sort((a, b) => a - b);

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-white">Filters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Country
          </label>
          <select
            value={filters.country}
            onChange={(e) =>
              setFilters({ ...filters, country: e.target.value })
            }
            className="w-full bg-gray-700 text-white rounded border border-gray-600 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Language
          </label>
          <select
            value={filters.language}
            onChange={(e) =>
              setFilters({ ...filters, language: e.target.value })
            }
            className="w-full bg-gray-700 text-white rounded border border-gray-600 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
          >
            <option value="">All Languages</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Page Range
          </label>
          <select
            value={filters.pageRange}
            onChange={(e) =>
              setFilters({ ...filters, pageRange: e.target.value })
            }
            className="w-full bg-gray-700 text-white rounded border border-gray-600 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
          >
            <option value="">All Page Ranges</option>
            {pageRanges.map((range) => (
              <option key={range} value={range}>
                {formatPageRange(range)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Century
          </label>
          <select
            value={filters.century}
            onChange={(e) =>
              setFilters({ ...filters, century: e.target.value })
            }
            className="w-full bg-gray-700 text-white rounded border border-gray-600 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
          >
            <option value="">All Centuries</option>
            {centuries.map((century) => (
              <option key={century} value={century}>
                {formatCentury(century)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="w-full bg-gray-700 text-white rounded border border-gray-600 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="year">Year</option>
            <option value="pages">Pages</option>
            <option value="country">Country</option>
          </select>
        </div>
      </div>

      {(filters.country || filters.language || filters.century || filters.pageRange) && (
        <button
          onClick={() =>
            setFilters({
              country: "",
              language: "",
              pageRange: "",
              century: "",
              sortBy: "title",
            })
          }
          className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default Filters;
