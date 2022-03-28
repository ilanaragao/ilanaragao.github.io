import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { IAuth } from '../interfaces/tokenInterfaces';

const verifyToken = async (token: string) => {
  const privateKey = await fs.readFile('jwt.evaluation.key', 'utf8');
  const verify = jwt.verify(token, privateKey);
  return verify as IAuth;
};

export default verifyToken;
