import * as BookController from '../controllers/BookController.js';
import express from 'express';

const bookRoutes = express.Router();

bookRoutes.get('/all', BookController.fetchBooks);
//bookRoutes.post('/new' , BookController.createbook)

export default bookRoutes;