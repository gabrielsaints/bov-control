import Animal, {
  IAnimalDocument,
  isAnimal,
  IAnimalSchema,
} from './../models/animals';

import chance from './utils/chance';

import Normalize from './utils/normalize';

describe('Animals', () => {
  let animal: IAnimalDocument;
  beforeAll(async () => {
    await Normalize.beforeAll();
  });

  afterAll(async () => {
    await Normalize.afterAll();
  });

  it('`save` should be able to register an animal', async () => {
    expect.assertions(1);
    const prepared: IAnimalSchema = {
      weight: chance.integer({ min: 1, max: 1000 }),
      ageInMonths: chance.integer({ min: 1, max: 10 }),
      name: chance.name(),
      type: chance.string(),
    };

    animal = new Animal(prepared);

    await animal.save();

    expect(await Animal.findOne({ _id: animal.id })).toBeInstanceOf(Animal);
  });

  it('`findOne` should be able to return an animal', async () => {
    expect.assertions(2);
    const found = await Animal.findOne({ _id: animal.id });

    if (!found) {
      fail('Animal has been not saved');
    }

    expect(found).toBeInstanceOf(Animal);
    expect(isAnimal(found)).toBe(true);
  });

  it('`animals` should be able to update an animal', async () => {
    expect.assertions(2);

    const oldName = animal.name;
    const newName = chance.name();

    animal.name = newName;

    await animal.save();

    expect(animal.name).toMatch(newName);
    expect(animal.name === oldName).toBe(false);
  });

  it('`animals` should be able to remove animal', async () => {
    expect.assertions(1);
    await animal.remove();

    expect(await Animal.findOne({ _id: animal.id })).toBe(null);
  });
});
