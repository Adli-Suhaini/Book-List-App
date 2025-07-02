import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import "./App.css";

import Header from "./Components/header";
import BookListItem from "./Components/BookList";
import Filters from "./Components/Filters";
import Pagination from "./Components/Pagination";

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    country: "",
    language: "",
    century: "",
    pageRange: "",
    sortBy: "title",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // To Fetch the Data
  useEffect(() => {
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error loading books:", error));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const getPageRange = (pages) => {
    return Math.ceil(pages / 100);
  };

  // To filter and search the book
  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        searchTerm === "" ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.country.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCountry =
        filters.country === "" || book.country === filters.country;

      const matchesLanguage =
        filters.language === "" || book.language === filters.language;

      const matchesPageRange =
        filters.pageRange === "" ||
        getPageRange(book.pages) === parseInt(filters.pageRange);

      const matchesCentury =
        filters.century === "" ||
        (book.year < 0
          ? Math.ceil(Math.abs(book.year) / 100) * -1
          : Math.ceil(book.year / 100)) === parseInt(filters.century);

      return (
        matchesSearch &&
        matchesCountry &&
        matchesLanguage &&
        matchesPageRange &&
        matchesCentury
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "author":
          return a.author.localeCompare(b.author);
        case "year":
          return b.year - a.year;
        case "pages":
          return b.pages - a.pages;
        case "country":
          return a.country.localeCompare(b.country);
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters books={books} filters={filters} setFilters={setFilters} />

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No books found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentBooks.map((book, index) => (
                <BookListItem key={startIndex + index} book={book} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={totalBooks}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
