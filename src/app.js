const express = require('express');

// --- Configuración de Middlewares ---
const app = express();
app.use(express.json()); // Para parsear JSON

// --- Infraestructura: instanciar repositorios ---
const InMemoryAuthorRepository = require('./infrastructure/repositoryImpl/InMemoryAuthorRepository');
const InMemoryBookRepository = require('./infrastructure/repositoryImpl/InMemoryBookRepository');

const authorRepository = new InMemoryAuthorRepository();
const bookRepository = new InMemoryBookRepository();

// --- Casos de Uso ---
const CreateAuthorUseCase = require('./usecases/CreateAuthorUseCase');
const GetAuthorUseCase = require('./usecases/GetAuthorUseCase');
const AddBookToAuthorUseCase = require('./usecases/AddBookToAuthorUseCase');

const createAuthorUseCase = new CreateAuthorUseCase(authorRepository);
const getAuthorUseCase = new GetAuthorUseCase(authorRepository, bookRepository);
const addBookToAuthorUseCase = new AddBookToAuthorUseCase(authorRepository, bookRepository);

// --- Adaptadores: Controladores ---
const AuthorController = require('./adapters/controllers/AuthorController');
const BookController = require('./adapters/controllers/BookController');

const authorController = new AuthorController({ createAuthorUseCase, getAuthorUseCase });
const bookController = new BookController({ addBookToAuthorUseCase });

// --- Rutas ---
const createRouter = require('./adapters/routes/apiRoutes');
const router = createRouter({ authorController, bookController });
app.use('/api', router);

module.exports = app;
