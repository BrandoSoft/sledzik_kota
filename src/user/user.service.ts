import { Injectable } from "@nestjs/common";
import { RegisterUserResponse, RegisterUserResponseArray } from "src/interfaces/user";
import { RegisterDto } from "./dto/register.dto";
import { User } from "./user.entity";
import { hashPwd } from "./utils/hash-pwd";
import { UserHid } from './userHid.entity';
import { AddNewHidAndNameDto } from './dto/userHid.dto';
import { CatInfo } from '../interfaces/catId';

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

    async addHidAndName(hidAndName: AddNewHidAndNameDto): Promise<string>{

      const newData =  new UserHid();

      newData.hid = hidAndName.hid;
      newData.catName = hidAndName.catName;
      newData.name = hidAndName.name;

      await newData.save();

      return 'all ok'

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
        const userHids = new UserHid();

        userHids.catName = item.catName;
        userHids.hid = item.hid;
        userHids.id = item.id;
        tableOfUSerHids.push(userHids)
        }))



        return tableOfUSerHids;
    }
    async getUserByMail(email: RegisterDto): Promise<RegisterUserResponseArray>{

        return User.find(email)
    }

    async DelCatById(catID: CatInfo): Promise<UserHid>{

      let name = await UserHid.findOne({where:
          {id: catID.catId }
      })
        await UserHid.remove(name)

      return name
    }

    helloMessage(){
        return 'hello'
    }
}