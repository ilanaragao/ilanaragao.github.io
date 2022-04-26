import { model as M, Document as D, Schema as S } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

import MongoModel from './MongoModel';

interface MotorcycleDocument extends Motorcycle, D {}

const motorcycleSchema = new S<MotorcycleDocument>(
  {
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    buyValue: { type: Number, required: true },
    category: { type: String, required: true },
    engineCapacity: { type: Number, required: true },
  },
  { versionKey: false },
);

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(public model = M('Motorcycles', motorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;
