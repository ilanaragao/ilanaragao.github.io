import { expect } from 'chai';
import Sinon from 'sinon';

import { Response } from 'express';

import CarController from '../../../controllers/CarController';
import { mockCar, mockZodError } from '../mocks/carMock';
import { Car } from '../../../interfaces/CarInterface';
import { RequestWithBody } from '../../../controllers/MongoController';

describe('Testa na camada Controller de Car', () => {
  let carController = new CarController() as any;
  const req = {} as RequestWithBody<Car>;
  const res = {} as Response;

  describe('se o método create', () => {
    beforeEach(() => {
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns(null);
    });

    afterEach(() => Sinon.restore());

    it('retorna status 500', async () => {
      Sinon.stub(carController.service, 'create').throws();
      await carController.create(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(500)).to.be.eql(true);
    });

    it('retorna status 400', async () => {
      Sinon.stub(carController.service, 'create').resolves(mockZodError);
      await carController.create(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(400)).to.be.eql(true);
    });

    it('retorna status 201', async () => {
      Sinon.stub(carController.service, 'create').resolves(mockCar);
      await carController.create(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.eql(true);
    });
  });

  describe('se o método read', () => {
    beforeEach(() => {
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns(null);
    });

    afterEach(() => Sinon.restore());

    it('retorna status 500', async () => {
      Sinon.stub(carController.service, 'read').throws();
      await carController.read(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(500)).to.be.eql(true);
    });

    it('retorna status 200', async () => {
      Sinon.stub(carController.service, 'read').resolves(mockCar);
      await carController.read(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.eql(true);
    });
  });

  describe('se o método readOne', () => {
    beforeEach(() => {
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns(null);
    });

    afterEach(() => Sinon.restore());

    it('retorna status 500', async () => {
      Sinon.stub(carController.service, 'readOne').throws();
      await carController.readOne(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(500)).to.be.eql(true);
    });

    it('retorna status 404 sem id correspondente', async () => {
      req.params = { id: '4edd40c86762e0fb12002022' };
      Sinon.stub(carController.service, 'readOne').resolves(null);
      await carController.readOne(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(404)).to.be.eql(true);
    });

    it('retorna 400 sem id válido', async () => {
      req.params = { id: 'xXxtriploxXx' };
      Sinon.stub(carController.service, 'readOne').resolves(mockZodError);
      await carController.readOne(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(400)).to.be.eql(true);
    });
  });
});
