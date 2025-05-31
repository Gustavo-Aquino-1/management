import { SignOptions } from "jsonwebtoken";

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '3d',
};

export default jwtConfig;
