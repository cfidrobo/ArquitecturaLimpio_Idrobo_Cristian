const express = require('express');

function createRouter({ authorController, bookController }) {
  const router = express.Router();

  // Rutas para Autores
  router.post('/authors', (req, res) => authorController.create(req, res));
  router.get('/authors/:id', (req, res) => authorController.get(req, res));

  // Rutas para Libros (asociados a un Autor)
  router.post('/authors/:authorId/books', (req, res) => bookController.add(req, res));

  return router;
}

module.exports = createRouter;
