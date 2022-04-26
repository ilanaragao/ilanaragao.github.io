import { expect } from 'chai';
import Sinon from 'sinon';

import CarService from '../../../services/CarService';
import { mockCar, mockWithError, mockWithId } from '../mocks/carMock';

describe('Testa na camada Service de Car', () => {
  let carService = new CarService() as any;

  describe('se o método create', () => {
    before(() => Sinon.stub(carService.model, 'create').resolves(mockCar));

    after(() => Sinon.restore());

    it('retorna um objeto do tipo Car', async () => {
      const car = await carService.create(mockCar);
      expect(car).to.be.deep.equal(mockCar);
    });

    it('retorna um erro quando enviado dados inválidos', async () => {
      const car = await carService.create(mockWithError);
      expect(car).to.have.property('error');
    });
  });

  describe('se o método read', () => {
    before(() => Sinon.stub(carService.model, 'read').resolves(mockWithId));

    after(() => Sinon.restore());

    it('retorna um array', async () => {
      const car = await carService.read();
      expect(car).to.be.an('array');
    });
  });
});
