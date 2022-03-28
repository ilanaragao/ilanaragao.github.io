import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { IToken } from '../interfaces/tokenInterfaces';

const createToken = async ({ email, role }: IToken): Promise<string> => {
  const privateKey = await fs.readFile('jwt.evaluation.key', 'utf-8');

  const token = jwt.sign({ email, role }, privateKey, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  return token;
};

export default createToken;
