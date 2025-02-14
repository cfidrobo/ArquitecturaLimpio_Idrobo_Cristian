class BookController {
    constructor({ addBookToAuthorUseCase }) {
      this.addBookToAuthorUseCase = addBookToAuthorUseCase;
    }
  
    async add(req, res) {
      try {
        const { authorId } = req.params;
        const bookData = req.body;
        const book = await this.addBookToAuthorUseCase.execute(authorId, bookData);
        res.status(201).json(book);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
  
  module.exports = BookController;
  