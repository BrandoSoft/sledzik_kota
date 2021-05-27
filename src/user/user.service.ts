import { Injectable } from "@nestjs/common";
import { RegisterUserResponse } from "src/interfaces/user";
import { RegisterDto } from "./dto/register.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {

   async register(newUser: RegisterDto): Promise<RegisterUserResponse>{
        
        const user = new User();

        user.name = newUser.name;
        user.email = newUser.email;
        user.hid = newUser.hid;


        await user.save();

        return user;
    }

}