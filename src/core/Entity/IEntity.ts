// import { OperationType } from '../Operation/Operation';
// import { IPouchEntity } from './IPouchEntity';

export interface IEntity {
  _id: string;
  _rev?: string;
  _deleted?: boolean;
  // exposeProps(): IPouchEntity<IEntity>;
  // getOperationType(): OperationType;
}