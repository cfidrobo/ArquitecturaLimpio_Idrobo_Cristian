const AuthorRepository = require('../../domain/repositories/AuthorRepository');

class InMemoryAuthorRepository extends AuthorRepository {
  constructor() {
    super();
    this.authors = new Map(); // id => objeto Author
    this.currentId = 1;
  }

  async create(author) {
    author.id = this.currentId.toString();
    this.authors.set(author.id, author);
    this.currentId++;
    return author;
  }

  async findById(id) {
    return this.authors.get(id) || null;
  }

  async getAll() {
    return Array.from(this.authors.values());
  }
}

module.exports = InMemoryAuthorRepository;
