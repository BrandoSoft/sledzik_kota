import { Injectable } from "@nestjs/common";
import { RegisterUserResponse, RegisterUserResponseArray } from "src/interfaces/user";
import { RegisterDto } from "./dto/register.dto";
import { User } from "./user.entity";
import { hashPwd } from "./utils/hash-pwd";

@Injectable()
export class UserService {

    filter(user: User): RegisterUserResponse {
     const {id, email, hid} = user;
     return {id, email, hid};   
    }

   async register(newUser: RegisterDto): Promise<RegisterUserResponse>{
        
        const user = new User();

        user.name = newUser.name;
        user.email = newUser.email;
        user.hid = newUser.hid;
        user.pwdHash = hashPwd(newUser.pwd);

        await user.save();

        return this.filter(user);
    }

    async getAllUsers(): Promise<RegisterUserResponseArray>{
        const userName = await User.find();

        const listOfUsers = [];

        userName.forEach(user =>{
            listOfUsers.push(user.name)
        })

        return listOfUsers
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