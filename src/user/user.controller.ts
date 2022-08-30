import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor( private readonly userService:UserService) {}

    @Post('signup')
    async create(@Body() createUserDto: any):Promise<any> {
        return await this.userService.create(createUserDto);
    }
    @Post('update')
    async update(@Body() updateUserDto: any):Promise<any> {
        return await this.userService.update(updateUserDto);
    }
}
