import { expect } from 'chai';
import Sinon from 'sinon';

import CarModel from '../../../models/CarModel';
import { mockCar, mockWithId } from '../mocks/carMock';

describe('Testa na camada Model de Car', () => {
  let carModel = new CarModel();

  describe('se o método create', () => {
    before(() => Sinon.stub(carModel.model, 'create').resolves(mockCar));

    after(() => Sinon.restore());

    it('retorna um objeto do tipo Car', async () => {
      const car = await carModel.create(mockCar);
      expect(car).to.be.deep.equal(mockCar);
    });
  });

  describe('se o método read', () => {
    before(() =>
      Sinon.stub(carModel.model, 'find').resolves(mockWithId as any),
    );

    after(() => Sinon.restore());

    it('retorna um carro', async () => {
      const car = await carModel.read();
      expect(car).to.be.deep.equal(mockWithId);
    });
  });
});
