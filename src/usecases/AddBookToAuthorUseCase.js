const Book = require('../domain/entities/Book');

class AddBookToAuthorUseCase {
  constructor(authorRepository, bookRepository) {
    this.authorRepository = authorRepository;
    this.bookRepository = bookRepository;
  }

  async execute(authorId, bookData) {
    // Verificamos que el autor exista
    const author = await this.authorRepository.findById(authorId);
    if (!author) throw new Error('Autor no encontrado');

    // Creamos el libro asociándolo al autor
    const book = new Book({ ...bookData, authorId });
    await this.bookRepository.create(book);

    // Actualizamos la entidad autor (opcional, según la persistencia)
    author.addBook(book);
    return book;
  }
}

module.exports = AddBookToAuthorUseCase;
