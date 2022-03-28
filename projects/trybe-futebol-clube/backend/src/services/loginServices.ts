import createToken from '../token/createToken';
import UserModels from '../database/models/UserModels';

import { ILogin } from '../interfaces/loginInterfaces';

const login = async ({ email, password }: ILogin) => {
  const user = await UserModels.findOne({
    where: { email },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const token = await createToken({ email, role: user.role });
  return { user, token };
};

export default { login };
