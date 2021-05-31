import { Injectable } from "@nestjs/common";
import { RegisterUserResponse, RegisterUserResponseArray } from "src/interfaces/user";
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

    async getAllUsers(): Promise<RegisterUserResponseArray>{

        return User.find();
    }

    async getUserByName(name: RegisterDto): Promise<RegisterUserResponseArray>{

        return User.find(name);
    }

    async getUserByHid(hid: RegisterDto): Promise<RegisterUserResponseArray>{

        return User.find(hid)
    }
    async getUserByMail(email: RegisterDto): Promise<RegisterUserResponseArray>{

        return User.find(email)
    }
}