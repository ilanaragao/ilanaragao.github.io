//! Sobre o '.match': https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match
//! Sobre o Regex: https://stackoverflow.com/questions/5317320/regex-to-check-string-contains-only-hex-characters

import { Request, Response } from 'express';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';
import StatusCodes from '../enums/statusCodes';

import MongoController, {
  RequestWithBody,
  ResponseError,
} from './MongoController';

class CarController extends MongoController<Car> {
  private _route: string;

  constructor(service = new CarService(), route = '/cars') {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);

      if (!car) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: this.errors.internal });
      }

      if ('error' in car) return res.status(StatusCodes.BAD_REQUEST).json(car);

      return res.status(StatusCodes.CREATED).json(car);
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const car = await this.service.read();
      return res.status(StatusCodes.OK).json(car);
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: this.errors.invalidId });
      }

      const car = await this.service.readOne(id);

      if (!car) return res.status(404).json({ error: this.errors.notFound });

      return res.json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string; obj: Car }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const obj = req.body;

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: this.errors.invalidId });
      }

      const car = await this.service.update(id, obj);

      if (!car) return res.status(404).json({ error: this.errors.notFound });

      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: this.errors.invalidId });
      }

      const delCar = await this.service.delete(id);

      if (!delCar) return res.status(404).json({ error: this.errors.notFound });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;
