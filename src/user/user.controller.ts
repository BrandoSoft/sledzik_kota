import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { RegisterUserResponse, RegisterUserResponseArray } from 'src/interfaces/user';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ){
    }
    @Get('/')
    @UseGuards(AuthGuard('jwt'))
        showUsers(
            @UserObj() user: User,
        ): Promise<RegisterUserResponseArray>{
            
            const isAdmin = user;
            
            return this.userService.getAllUsers(isAdmin);
        }

    @Get('/name/:name')
        showUserByName(
            @Param() name: RegisterDto,
        ): Promise<RegisterUserResponseArray>{
            return this.userService.getUserByName(name);
        }
    @Get('/hid/:hid')
        showUserByHid(
            @Param() hid: RegisterDto,
        ): Promise<RegisterUserResponseArray>{
            return this.userService.getUserByHid(hid);
        }
    @Get('/email/:email')
        showUserByMail(
            @Param() email: RegisterDto,
        ): Promise<RegisterUserResponseArray>{
            return this.userService.getUserByHid(email)
        }    

    @Post('/register')
        register(
            @Body() newUser: RegisterDto,
        ): Promise<RegisterUserResponse>{
            return this.userService.register(newUser)
        }
}
