import { model as M, Document as D, Schema as S } from 'mongoose';
import { Car } from '../interfaces/CarInterface';

import MongoModel from './MongoModel';

interface CarDocument extends Car, D {}

const carSchema = new S<CarDocument>(
  {
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    status: { type: Boolean, required: false },
    buyValue: { type: Number, required: true },
    doorsQty: { type: Number, required: true },
    seatsQty: { type: Number, required: true },
  },
  { versionKey: false },
);

class CarModel extends MongoModel<Car> {
  constructor(public model = M('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;
