import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { RegisterUserResponse, RegisterUserResponseArray } from 'src/interfaces/user';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ){
    }
    @Get('/')
        showUsers(): Promise<RegisterUserResponseArray>{
            return this.userService.getAllUsers();
        }

    @Post('/register')
        register(
            @Body() newUser: RegisterDto,
        ): Promise<RegisterUserResponse>{
            return this.userService.register(newUser)
        }
}
