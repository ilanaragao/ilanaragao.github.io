import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModels from '../database/models/UserModels';
import ClubModels from '../database/models/ClubModels';
import MatchModels from '../database/models/MatchModels';
import mocks from '../tests/mocks/mocks';
import { Response } from 'superagent';
import leaderboardServices from '../services/leaderboardServices';

chai.use(chaiHttp);

const { expect } = chai;

describe('Na rota /login', () => {
  let chaiHttpResponse: Response;
  const { email, password } = mocks.mockUser;

  before(async () => {
    sinon.stub(UserModels, 'findOne').resolves(mocks.mockUser as UserModels);
  });

  after(() => {
    (UserModels.findOne as sinon.SinonStub).restore();
  });

  it('O login é feito com sucesso', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'user@user.com.br', password: '1234567' });

    expect(chaiHttpResponse).to.have.status(200);
  });

  it('Retorna status 401 ao passar um email inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'user', password });

    expect(chaiHttpResponse).to.have.status(401);
  });

  it('Retorna status 401 ao passar uma senha inválida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email, password: '123' });

    expect(chaiHttpResponse).to.have.status(401);
  });

  it('Retorna status 401 ao passar apenas o password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password });

    expect(chaiHttpResponse).to.have.status(401);
  });

  it('Retorna status 401 ao passar apenas o email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email });

    expect(chaiHttpResponse).to.have.status(401);
  });

  it('Retorna o status correto ao validar o token', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0ODQzMTAyMSwiZXhwIjoxNjQ5MDM1ODIxfQ.GVPd-8279NI0EbLVhTyyfmfiW1BZ7I5Kk2JksNaaQtw';
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token);

    expect(chaiHttpResponse).to.have.status(200);
  });
});

describe('Na rota /clubs', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(ClubModels, 'findAll').resolves(mocks.mockClubs as ClubModels[]);
  });

  after(() => {
    (ClubModels.findAll as sinon.SinonStub).restore();
  });

  it('Verifica se recebe todos os times', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs');

    expect(chaiHttpResponse).to.have.status(200);
  });

  it('Verifica se recebe um time específico', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs/1');

    expect(chaiHttpResponse).to.have.status(200);
  });
});

describe('Na rota /matchs', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(MatchModels, 'findAll')
      .resolves(mocks.mockMatchs as MatchModels[]);
  });

  after(() => {
    (MatchModels.findAll as sinon.SinonStub).restore();
  });

  it('Verifica se recebe todos os jogos', async () => {
    chaiHttpResponse = await chai.request(app).get('/matchs');

    expect(chaiHttpResponse).to.have.status(200);
  });

  it('Com a query `matchs?inProgress=true` retorna todos os jogos em andamento', async () => {
    chaiHttpResponse = await chai.request(app).get('/matchs?inProgress=true');

    expect(chaiHttpResponse.body[0]).to.have.property('inProgress', 1);
  });

  it('Com a query `matchs?inProgress=false`, retorna todos os jogos que não estão em andamento', async () => {
    chaiHttpResponse = await chai.request(app).get('/matchs?inProgress=false');

    expect(chaiHttpResponse.body[1]).to.have.property('inProgress', 0);
  });

  describe('Testando a Rota Patch /matchs/:id', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(MatchModels, 'update').resolves();
    });

    after(() => {
      (MatchModels.update as sinon.SinonStub).restore();
    });

    it('Verifica se o status é o correto', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matchs/1').send({
        homeTeamGoals: 3,
        awayTeamGoals: 1,
      });

      expect(chaiHttpResponse).to.have.status(200);
    });
  });

  describe('Na rota /matchs/:id/finish', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(MatchModels, 'update');
    });

    after(() => {
      (MatchModels.update as sinon.SinonStub).restore();
    });

    it('Verifica se finaliza um match', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matchs/1/finish');

      expect(chaiHttpResponse).to.have.status(200);
    });
  });
});

describe('Na rota /leaderboard', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(leaderboardServices, 'leaderboard')
      .resolves(mocks.mockLeaderboard);
  });

  after(() => {
    (leaderboardServices.leaderboard as sinon.SinonStub).restore();
  });

  it('Verifica se retorna a classificação', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard');

    expect(chaiHttpResponse).to.have.status(200);
  });
});

describe('Na rota /leaderboard/home', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(leaderboardServices, 'filterByHome')
      .resolves(mocks.mockLeaderboard);
  });

  after(() => {
    (leaderboardServices.filterByHome as sinon.SinonStub).restore();
  });

  it('Verifica se o status é o correto', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse).to.have.status(200);
  });
});

describe('Na rota /leaderboard/away', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(leaderboardServices, 'filterByAway')
      .resolves(mocks.mockLeaderboard);
  });

  after(() => {
    (leaderboardServices.filterByAway as sinon.SinonStub).restore();
  });

  it('Verifica se o status é o correto', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiHttpResponse).to.have.status(200);
  });
});
