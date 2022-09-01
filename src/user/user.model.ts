import { ConflictException } from "@nestjs/common";
import { getModel, Schema } from "ottoman";
import { BadRequestException } from "@nestjs/common";
import { addValidators } from "ottoman";
import { hash } from "bcryptjs";

addValidators({

  email: (value: string) => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (value && !value.match(regex)) {
        throw new BadRequestException('invalid email address!');
      }
    },
    password: (value: string) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,60}$/
      if (value && !value.match(regex)) {
        throw new BadRequestException('password doesn\'t satisfies requirement!');
      }
    }
  })

  const passwordValidator = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,60}$/
    if (value && !value.match(regex)) {
      throw new BadRequestException('password doesn\'t satisfies requirement!');
    }
    return true;
  }

const UserSchema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true, validator: 'email' },
    password:{type: String, required: true},
    verified: {type:Boolean}
  }, {
    preHooks: {
      'save': async (doc:any) => {
        const UserModel = getModel('User');
       
        const user= await UserModel.findOneByEmail(doc.email)
       
        if(user.rows.length >0){
          throw new ConflictException(doc.email + 'user already exist!');
        }
        const temp = await hash(doc.password, 12);
        doc.password = temp;
        if (passwordValidator(doc.password)) {
          const temp = await hash(doc.password, 12);
          doc.password = temp;
        }
      }
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