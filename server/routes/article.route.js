import express from 'express';
import { create, readAll, readOne, update } from '../controllers/article.controller.js';

const router = express.Router();

// create
router.post('/', create);

// readAll
router.get('/', readAll)
router.get('/page/:page', readAll)
router.get('/limit/:limit', readAll)
router.get('/page/:page/limit/:limit', readAll)

// readOne
router.get('/:slug', readOne)

// update
router.post('/update/:slug', update)


export default router;