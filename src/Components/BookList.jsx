import { useState } from "react";
import {
  BookOpen,
  Globe,
  Calendar,
  FileText,
  ExternalLink,
} from "lucide-react";

const BookListItem = ({ book }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          {!imageError ? (
            <img
              src={book.imageLink}
              alt={book.title}
              className="w-16 h-20 object-cover rounded"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-16 h-20 bg-gray-700 flex items-center justify-center rounded">
              <BookOpen className="h-6 w-6 text-gray-500" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-white truncate">
                {book.title}
              </h3>
              <p className="text-blue-400 font-medium">{book.author}</p>
            </div>
            <span className="text-gray-400 text-sm">{book.year}</span>
          </div>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center space-x-1">
              <Globe className="h-3 w-3" />
              <span>{book.country}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{book.language}</span>
            </span>
            <span className="flex items-center space-x-1">
              <FileText className="h-3 w-3" />
              <span>{book.pages} pages</span>
            </span>
          </div>

          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 mt-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            <span>Learn more</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookListItem;
