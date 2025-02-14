const BookRepository = require('../../domain/repositories/BookRepository');

class InMemoryBookRepository extends BookRepository {
  constructor() {
    super();
    this.books = new Map(); // id => objeto Book
    this.currentId = 1;
  }

  async create(book) {
    book.id = this.currentId.toString();
    this.books.set(book.id, book);
    this.currentId++;
    return book;
  }

  async findById(id) {
    return this.books.get(id) || null;
  }

  async findByAuthorId(authorId) {
    const result = [];
    for (const book of this.books.values()) {
      if (book.authorId === authorId) {
        result.push(book);
      }
    }
    return result;
  }
}

module.exports = InMemoryBookRepository;
