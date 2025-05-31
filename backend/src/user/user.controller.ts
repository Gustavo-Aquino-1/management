import { Body, Controller, Get, Post } from "@nestjs/common";
import UserService from "./user.service";
import UserPostDto from "./dto/user.post.dto";
import UserLoginDto from "./dto/user.login.dto";


@Controller('/user')
export default class UserController {
    private readonly service = new UserService()

    @Post()
    async post(@Body() data: UserPostDto) {
        return await this.service.post(data)
    }

    @Post('/login')
    async login(@Body() data: UserLoginDto) {
        return await this.service.login(data)
    }
}
