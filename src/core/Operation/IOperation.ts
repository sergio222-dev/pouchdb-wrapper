import { IEntity } from '../Entity/IEntity';
import { OperationType } from './Operation';

export interface IOperation {
  getOperationType(): OperationType;
  getEntity(): IEntity;
  getContextName(): string;
}