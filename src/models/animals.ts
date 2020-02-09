import { Document, model, Model, Schema } from 'mongoose';

interface IAnimalSchema {
  type?: string;
  name?: string;
  weight?: number;
  ageInMonths?: number;
}

interface IAnimalSerialized extends IAnimalSchema {
  _id: string;
}

interface IAnimalDocument extends Document {
  _id: string;
  type: string;
  name: string;
  weight: number;
  ageInMonths: number;
  serialize: () => IAnimalSerialized;
}

interface IAnimalModel extends Model<IAnimalDocument> {}

const animalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  ageInMonths: {
    type: Number,
    required: true,
  },
});

animalSchema.methods.serialize = function(): IAnimalSerialized {
  const animal: IAnimalSerialized = {
    _id: this.id,
    name: this.name,
    ageInMonths: this.ageInMonths,
    type: this.type,
    weight: this.weight,
  };

  return animal;
};

const isAnimal = (animal: IAnimalSerialized): animal is IAnimalSerialized => {
  return !!(
    animal &&
    animal.weight &&
    animal.name &&
    animal.ageInMonths &&
    animal.type &&
    animal._id
  );
};

export { IAnimalDocument, isAnimal, IAnimalSerialized, IAnimalSchema };

const animalModel: IAnimalModel = model<IAnimalDocument, IAnimalModel>(
  'Animal',
  animalSchema,
);

export default animalModel;
