import request from '../utils/request';

import chance from '../utils/chance';
import Normalize from '../utils/normalize';

import Animal, {
  IAnimalDocument,
  IAnimalSchema,
  isAnimal,
} from '../../models/animals';
import { Types } from 'mongoose';

describe('API Animals', () => {
  const animalMock: IAnimalSchema = {
    ageInMonths: chance.integer({ min: 1, max: 10 }),
    name: chance.name(),
    type: chance.string(),
    weight: chance.integer({ min: 1, max: 1000 }),
  };

  const animal: IAnimalDocument = new Animal(animalMock);

  beforeAll(async () => {
    await Normalize.beforeAll();
    await animal.save();
  });

  afterAll(async () => {
    await animal.remove();
    await Normalize.afterAll();
  });

  test('`GET /animals` should return `400` sending invalid data', async () => {
    expect.assertions(2);

    const response = await request().get(`/animals?test=${chance.string()}`);

    expect(response.status).toBe(400);
    expect(response.body.animals).not.toBeDefined();
  });

  test('`GET /animals` should return `200` with a list of animals', async () => {
    expect.assertions(4);

    const response = await request().get('/animals');

    expect(response.status).toBe(200);
    expect(response.body.animals).toBeDefined();
    expect(response.body.animals).toHaveLength(1);
    expect(isAnimal(response.body.animals[0])).toBe(true);
  });

  test('`GET /animals/:id` should return `422` sending invalid format', async () => {
    expect.assertions(2);

    const response = await request().get(`/animals/${chance.hash()}`);

    expect(response.status).toBe(422);
    expect(response.body.animal).not.toBeDefined();
  });

  test('`GET /animals/:id` should return `400` with invalid data', async () => {
    expect.assertions(2);

    const response = await request().get(
      `/animals/${Types.ObjectId()}?test=${chance.hash()}`,
    );

    expect(response.status).toBe(400);
    expect(response.body.animal).not.toBeDefined();
  });

  test('`GET /animals/:id` should return `404` with invalid id', async () => {
    expect.assertions(2);

    const response = await request().get(`/animals/${Types.ObjectId()}`);

    expect(response.status).toBe(404);
    expect(response.body.animal).not.toBeDefined();
  });

  test('`GET /animals/:id` should return `200` with a animal', async () => {
    expect.assertions(3);

    const response = await request().get(`/animals/${animal.id}`);

    expect(response.status).toBe(200);
    expect(response.body.animal).toBeDefined();
    expect(isAnimal(response.body.animal)).toBe(true);
  });

  test('`POST /animals` should return `422` using an invalid object', async () => {
    expect.assertions(2);
    const response = await request()
      .post('/animals')
      .send({
        [chance.hash()]: chance.string(),
      });

    expect(response.status).toBe(422);
    expect(response.body.animal).toBeUndefined();
  });

  test('`POST /animals` should return `400` with invalid data', async () => {
    expect.assertions(3);

    const post: IAnimalSchema = {
      ageInMonths: chance.integer({ min: 1, max: 10 }),
      name: chance.name(),
      type: chance.string(),
      weight: chance.integer({ min: 1, max: 1000 }),
    };

    const response = await request()
      .post(`/animals?test=${chance.string()}`)
      .send(post);

    expect(response.status).toBe(400);
    expect(response.body.animal).not.toBeDefined();
    expect(response.body.updated).not.toBeDefined();
  });

  test('`POST /animals` should return `201` with an object of Animal', async () => {
    expect.assertions(3);

    const post: IAnimalSchema = {
      ageInMonths: chance.integer({ min: 1, max: 10 }),
      name: chance.name(),
      type: chance.string(),
      weight: chance.integer({ min: 1, max: 1000 }),
    };

    const response = await request()
      .post('/animals')
      .send(post);

    expect(response.status).toBe(201);
    expect(response.body.animal).toBeDefined();

    const animalTesting = await Animal.findById(response.body.animal._id);

    expect(animalTesting).not.toBeNull();

    if (!animalTesting) {
      fail();
    }

    await animalTesting.remove();
  });

  test('`PUT /animals` should return `422` using an invalid object', async () => {
    expect.assertions(2);
    const response = await request()
      .put('/animals')
      .send({
        [chance.hash()]: chance.string(),
      });

    expect(response.status).toBe(422);
    expect(response.body.animal).toBeUndefined();
  });

  test('`PUT /animals` should return `404` trying to edit an inexistent animal', async () => {
    expect.assertions(3);

    const response = await request()
      .put('/animals')
      .send({
        id: Types.ObjectId(),
      });

    expect(response.status).toBe(404);
    expect(response.body.animal).not.toBeDefined();
    expect(response.body.updated).not.toBeDefined();
  });

  test('`PUT /animals` should return `400` with invalid data', async () => {
    expect.assertions(3);

    const response = await request()
      .put(`/animals?test=${chance.string()}`)
      .send({
        id: Types.ObjectId(),
      });

    expect(response.status).toBe(400);
    expect(response.body.animal).not.toBeDefined();
    expect(response.body.updated).not.toBeDefined();
  });

  test('`PUT /animals` should return `422` with invalid object id', async () => {
    expect.assertions(3);

    const response = await request()
      .put(`/animals?test=${chance.string()}`)
      .send({
        id: chance.hash(),
      });

    expect(response.status).toBe(422);
    expect(response.body.animal).not.toBeDefined();
    expect(response.body.updated).not.toBeDefined();
  });

  test('`PUT /animals` should return `200` and will able to update an animal', async () => {
    expect.assertions(5);

    const response = await request()
      .put('/animals')
      .send({
        id: animal.id,
        name: chance.name(),
        type: chance.string(),
        weight: chance.integer({ min: 1, max: 10000 }),
        ageInMonths: chance.integer({ min: 1, max: 10 }),
      });

    expect(response.status).toBe(200);
    expect(response.body.animal).toBeDefined();
    expect(response.body.updated).toBeDefined();
    expect(isAnimal(response.body.animal)).toBe(true);
    expect(response.body.updated).toHaveLength(4);
  });
});
