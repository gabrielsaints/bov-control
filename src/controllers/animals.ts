import { RequestHandler } from 'express';

import RequestError from '../helpers/request-error';

import Animal, {
  IAnimalDocument,
  IAnimalSerialized,
  IAnimalSchema,
} from '../models/animals';

import { IModified } from '../helpers/modifiedType';

const all: RequestHandler = async (req, res, next) => {
  try {
    if (
      Object.keys(req.body).length ||
      Object.keys(req.params).length ||
      Object.keys(req.query).length
    ) {
      throw new RequestError(400, 'Bad request');
    }

    const animals: IAnimalDocument[] = await Animal.find({});

    res.status(200).json({
      animals: await Promise.all(
        animals.map(
          async (animal): Promise<IAnimalSerialized> => animal.serialize(),
        ),
      ),
    });
  } catch (err) {
    next(err);
  }
};

const store: RequestHandler = async (req, res, next) => {
  try {
    if (Object.keys(req.params).length || Object.keys(req.query).length) {
      throw new RequestError(400, 'Bad request');
    }
    const { ageInMonths, name, type, weight } = req.body;

    const stored: IAnimalSchema = {
      ageInMonths,
      name,
      type,
      weight,
    };

    const animal: IAnimalDocument = new Animal(stored);

    await animal.save();

    res.status(201).json({
      animal: await animal.serialize(),
    });
  } catch (err) {
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    if (Object.keys(req.params).length || Object.keys(req.query).length) {
      throw new RequestError(400, 'Bad request');
    }
    const updated: IModified[] = [];
    let old: any;

    const animal: IAnimalDocument | null = await Animal.findById(req.body.id);

    if (!animal) {
      throw new RequestError(404, 'Not found');
    }

    old = await animal.serialize();

    if (req.body.weight) {
      updated.push({
        key: 'weight',
        from: animal.weight,
        to: req.body.weight,
      });
      animal.weight = req.body.weight;
    }

    if (req.body.name) {
      updated.push({
        key: 'name',
        from: animal.name,
        to: req.body.name,
      });
      animal.name = req.body.name;
    }

    if (req.body.ageInMonths) {
      updated.push({
        key: 'ageInMonths',
        from: animal.ageInMonths,
        to: req.body.ageInMonths,
      });
      animal.ageInMonths = req.body.ageInMonths;
    }

    if (req.body.type) {
      updated.push({
        key: 'type',
        from: old.type,
        to: animal.type,
      });

      animal.type = req.body.type;
    }

    await animal.save();

    res.status(200).json({
      animal: await animal.serialize(),
      updated,
    });
  } catch (err) {
    next(err);
  }
};

// const drop: RequestHandler = async (req, res, next) => {
//   try {
//     const mustBe: string = 'EM VALIDAÇÃO';

//     const animal: IAnimalDocument | null = await Animal.findById(req.params.id);

//     if (!animal) {
//       throw new RequestError(404, 'Not found');
//     }

//     if (!animal.status.match(mustBe)) {
//       throw new RequestError(405, "You aren't allowed to edit this field");
//     }

//     await animal.remove();

//     res.status(204).send('ok');
//   } catch (err) {
//     next(err);
//   }
// };

export { all, store, update };
