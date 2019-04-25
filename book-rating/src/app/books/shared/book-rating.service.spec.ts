import { TestBed } from '@angular/core/testing';

import { BookRatingService } from './book-rating.service';
import { Book } from './book';

describe('BookRatingService', () => {
  let rs: BookRatingService;
  let book: Book;

  beforeEach(() => TestBed.configureTestingModule({}));

  // Arrange
  beforeEach(() => {
    rs = TestBed.get(BookRatingService);
    book = {
      isbn: '',
      title: '',
      price: 2,
      rating: 3,
      description: ''
    };
  });

  it('should be created', () => {
    const service: BookRatingService = TestBed.get(BookRatingService);
    expect(service).toBeTruthy();
  });

  it('should rate up a book by one', () => {
    // Act
    const ratedBook = rs.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(4);
  });

  it('should rate down a book by one', () => {
    const ratedBook = rs.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not rate higher than 5', () => {
    // Arrange
    book.rating = 5;

    // Act
    const ratedBook = rs.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(5);
  });

  it('should not rate lower than 1', () => {
    book.rating = 1;
    const ratedBook = rs.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });

  it('should not change the book directly', () => {
    const ratedBook = rs.rateUp(book);
    expect(ratedBook).not.toBe(book);
  });
});
