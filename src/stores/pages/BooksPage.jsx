import React, { useState } from 'react';
import { booksData } from '../data/books';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const BooksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);

  const categoryHandler = (category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((item) => item !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  const filteredBooks =
    selectedCategory.length === 0
      ? booksData
      : booksData.filter((book) => selectedCategory.includes(book.category));

  return (
    <>
      <Navbar />
      <div className="fullpage">
        <div className="pro-selected">
          {booksData
            .map((book) => book.category)
            .filter((value, index, self) => self.indexOf(value) === index) // unique categories
            .map((category) => (
              <div className="pro-input" key={category}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes(category)}
                    onChange={() => categoryHandler(category)}
                  />
                  {category}
                </label>
              </div>
            ))}
        </div>

        <div className="pageSection">
          {filteredBooks.map((item) => (
            <div key={item.id}>
              <Link to={`/books/${item.id}`}>
                <div className="pageImg">
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                </div>
              </Link>
              <div className="proModel">
                {item.title}, {item.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BooksPage;
