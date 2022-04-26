import { Car, CarSchema } from '../interfaces/CarInterface';

import MongoService, { ServiceError } from './MongoService';
import CarModel from '../models/CarModel';

class CarService extends MongoService<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.create(obj);
  };
}

export default CarService;
