import bcrypt from 'bcryptjs';

export const bcryptSaltHash = (temp: string) => {
  return bcrypt.hashSync(temp, 12);
};
