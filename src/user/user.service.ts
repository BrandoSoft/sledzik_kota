import { Injectable } from "@nestjs/common";
import { RegisterUserResponse, RegisterUserResponseArray } from "src/interfaces/user";
import { RegisterDto } from "./dto/register.dto";
import { User } from "./user.entity";
import { hashPwd } from "./utils/hash-pwd";
import { UserHid } from './userHid.entity';

@Injectable()
export class UserService {

    filter(user: User): RegisterUserResponse {
     const {id, email, hid, isAdmin} = user;
     return {id, email, hid, isAdmin};
    }

   async register(newUser: RegisterDto): Promise<RegisterUserResponse>{
        
        const user = new User();

        user.name = newUser.name;
        user.email = newUser.email;
        user.pwdHash = hashPwd(newUser.pwd);

        await user.save();

        return this.filter(user);
    }

    async getAllUsers(userInfoFromRequest: RegisterUserResponse): Promise<RegisterUserResponseArray>{
        
        const userName = await User.find();
        const listOfUsers = [];
        
        if(userInfoFromRequest.isAdmin){
            userName.forEach(user =>{
                listOfUsers.push(user.name)
            })
        }
        
        
        return listOfUsers;
        
    }

    async getUserByName(name: RegisterDto): Promise<RegisterUserResponseArray>{

        return User.find(name);
    }

    async returnUserHids(name: any): Promise<any>{

        const hids = await UserHid.find({where:
        {name: name.name}
        })
        const tableOfUSerHids = [];

        hids.forEach((item =>{
        tableOfUSerHids.push(item.hid)}))


        return tableOfUSerHids;
    }
    async getUserByMail(email: RegisterDto): Promise<RegisterUserResponseArray>{

        return User.find(email)
    }

    helloMessage(){
        return 'hello'
    }
}