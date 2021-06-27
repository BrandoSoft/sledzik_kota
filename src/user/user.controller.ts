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

    @Get('/message')
        getMessage(){
            return this.userService.helloMessage();
        }


    @Get('/')
    @UseGuards(AuthGuard('jwt'))
        showUsers(
            @UserObj() user: User,
        ): Promise<RegisterUserResponseArray>{
            console.log(user)
            const userInfoFromRequest = user;
            
            return this.userService.getAllUsers(userInfoFromRequest);
        }

    @Get('/name/:name')
        showUserByName(
            @Param() name: RegisterDto,
        ): Promise<RegisterUserResponseArray>{
            return this.userService.getUserByName(name);
        }
    @Get('/hids/:name')
    @UseGuards(AuthGuard('jwt'))
        getUserHids(
            @Param() name: any,
        ): Promise<RegisterUserResponseArray>{
               return this.userService.returnUserHids(name);
        }
    @Get('/email/:email')
        showUserByMail(
            @Param() email: RegisterDto,
        ): Promise<RegisterUserResponseArray>{
            return this.userService.getUserByMail(email)
        }    

    @Post('/register')
        register(
            @Body() newUser: RegisterDto,
        ): Promise<RegisterUserResponse>{
            return this.userService.register(newUser)
        }
}
