import express from 'express';

import { post, put, getUnique } from '../schemas/animals';

import { all, store, update, unique } from '../controllers/animals';

import Validate from '../helpers/validate';

const router = express.Router();

router.get('/animals/:id', Validate.fields('params', getUnique), unique);
router.post('/animals', Validate.fields('body', post), store);
router.put('/animals', Validate.fields('body', put), update);
router.get('/animals', all);

export default router;
