import express from 'express';
import { create, readAll, readOne, update } from '../controllers/article.controller.js';

const router = express.Router();

// create
router.post('/', create);

// readAll
router.get('/', readAll);

// readOne
router.get('/:slug', readOne);

// update
router.post('/edit/:slug', update);


export default router;