import { ConflictException } from "@nestjs/common";
import { getModel, Schema } from "ottoman";
import { BadRequestException } from "@nestjs/common";
import { addValidators } from "ottoman";

addValidators({

  email: (value: string) => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (value && !value.match(regex)) {
        throw new BadRequestException('invalid email address!');
      }
    }
  })

const UserSchema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true, validator: 'email' },
    verified: {type:Boolean}
  }, {
    preHooks: {
      'validate': async (doc:any) => {
        const UserModel = getModel('User');
       
        const user= await UserModel.findOneByEmail(doc.email)
       
        if(user.rows.length >0){
          throw new ConflictException(doc.email + 'user already exist!');
        }
      },
    },
    strict: true,
    timestamps: true
  })

  UserSchema.index.findOneByEmail = {
    by: 'email',
    options: { limit:1 },
    type: 'n1ql'
  }

  export { UserSchema} 