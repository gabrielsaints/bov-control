import express from 'express';

import { post, put } from '../schemas/animals';

import { all, store, update } from '../controllers/animals';

import Validate from '../helpers/validate';

const router = express.Router();

router.get('/animals', all);
router.post('/animals', Validate.fields('body', post), store);
router.put('/animals', Validate.fields('body', put), update);

export default router;
