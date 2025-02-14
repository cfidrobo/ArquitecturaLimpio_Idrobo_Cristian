const Author = require('../domain/entities/Author');

class CreateAuthorUseCase {
  constructor(authorRepository) {
    this.authorRepository = authorRepository;
  }

  async execute(authorData) {
    const author = new Author(authorData);
    return await this.authorRepository.create(author);
  }
}

module.exports = CreateAuthorUseCase;
