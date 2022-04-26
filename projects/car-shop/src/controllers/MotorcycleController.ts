import { Request, Response } from 'express';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import StatusCodes from '../enums/statusCodes';

import MongoController, {
  RequestWithBody,
  ResponseError,
} from './MongoController';

class MotorcycleController extends MongoController<Motorcycle> {
  private _route: string;

  constructor(service = new MotorcycleService(), route = '/motorcycles') {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const motorcycle = await this.service.create(body);

      if (!motorcycle) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: this.errors.internal });
      }

      if ('error' in motorcycle) return res.status(400).json(motorcycle);

      return res.status(StatusCodes.CREATED).json(motorcycle);
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Motorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const motorcycle = await this.service.read();
      return res.status(StatusCodes.OK).json(motorcycle);
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: this.errors.invalidId });
      }

      const motorcycle = await this.service.readOne(id);

      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.json(motorcycle);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string; obj: Motorcycle }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const obj = req.body;

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: this.errors.invalidId });
      }

      const motorcycle = await this.service.update(id, obj);

      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.status(200).json(motorcycle);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: this.errors.invalidId });
      }

      const delMotorcycle = await this.service.delete(id);

      if (!delMotorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MotorcycleController;
