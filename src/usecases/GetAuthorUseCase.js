class GetAuthorUseCase {
    constructor(authorRepository, bookRepository) {
      this.authorRepository = authorRepository;
      this.bookRepository = bookRepository;
    }
  
    async execute(authorId) {
      const author = await this.authorRepository.findById(authorId);
      if (!author) throw new Error('Autor no encontrado');
      
      // Obtener libros relacionados al autor
      const books = await this.bookRepository.findByAuthorId(authorId);
      author.books = books;
      return author;
    }
  }
  
  module.exports = GetAuthorUseCase;
  