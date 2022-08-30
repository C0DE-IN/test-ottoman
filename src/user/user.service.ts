import { Injectable } from '@nestjs/common';
import { getModel } from 'ottoman';

@Injectable()
export class UserService {

    async create(createUserDto: any):Promise<any> {
        const UserModel = getModel('User');
        try{
          const createUser = new UserModel(createUserDto);
          
          return await createUser.save();;
        }catch(err){
          throw(err);
        }    
      }
    
    async update(updateUserDto:any):Promise<any>{

        const UserModel =  getModel('User');
        try{
            return await UserModel.updateById(updateUserDto.id, { verified:true});
          } catch (err){
            console.log(err)
            throw("update catch: " + err);
          }
    }
}
