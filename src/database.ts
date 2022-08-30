import { Injectable } from '@nestjs/common';
import { Ottoman, Schema, getModel, model } from 'ottoman';
@Injectable()
export class Database {
        async connectOttoman(scopeName:string, collectionName:string, ottomanSchema?:Schema, modelName?:string ):Promise<Ottoman>{
          
          const ottoman = new Ottoman({collectionName, scopeName});
          await ottoman.connect({
            connectionString: 'localhost:8091',  
            username: 'Administrator',
            password: 'test@123',
            bucketName: 'test',
          });
          try{getModel(modelName) || model(modelName, ottomanSchema);} catch(err){throw(err)}
          await ottoman.start();
          return ottoman;
        }
}
