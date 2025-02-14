class AuthorController {
    constructor({ createAuthorUseCase, getAuthorUseCase }) {
      this.createAuthorUseCase = createAuthorUseCase;
      this.getAuthorUseCase = getAuthorUseCase;
    }
  
    async create(req, res) {
      try {
        const authorData = req.body;
        const author = await this.createAuthorUseCase.execute(authorData);
        res.status(201).json(author);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async get(req, res) {
      try {
        const { id } = req.params;
        const author = await this.getAuthorUseCase.execute(id);
        res.status(200).json(author);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }
  }
  
  module.exports = AuthorController;
  