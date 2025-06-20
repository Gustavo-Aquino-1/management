import { UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';


export const verifyToken = (secret: string, token: string) => {
  if (typeof token != 'string')
    throw new UnauthorizedException({ message: 'Please send your token' });

  token = token.split('Bearer ')[1];

  try {
    return jwt.verify(token, secret) as any;
  } catch (error) {
    throw new UnauthorizedException({ message: 'Token need to refresh' });
  }
};
