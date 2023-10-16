import { Router } from 'express';
import { libro } from './controller.js';

export const router = new Router()

router.get('/libros', libro.getAll);
router.get('/libro', libro.getOne);