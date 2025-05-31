import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from 'prisma/prisma.db';
import UserPostDto from './dto/user.post.dto';
import * as argon2 from 'argon2';
import UserLoginDto from './dto/user.login.dto';
import * as jwt from 'jsonwebtoken'
import jwtConfig from 'src/utils/jwt.config';


@Injectable()
export default class UserService {
  async post(data: UserPostDto) {
    // pendencias, receber o file e salvar no cloudnary e no user

    const hash = await argon2.hash(data.password);
    data.password = hash;

    return await prisma.user.create({
      data,
    });
  }

  async login({ email, password }: UserLoginDto) {
    const user = await prisma.user.findFirst({
      where: { email }
    })

    if(!user) throw new NotFoundException({ message: 'User not found '}) // economiza processamento

    const valid = await argon2.verify(user.password, password) // somente se o user existir acontece a checagem
    if(!valid) throw new NotFoundException({ message: 'User not found '})
    
    const secret = process.env.JWT_PASSWORD
    const token = await jwt.sign({ id: user.id }, secret, jwtConfig)

    return { id: user.id, token }
  }
}
