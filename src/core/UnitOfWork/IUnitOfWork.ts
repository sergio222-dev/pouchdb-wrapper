import { IOperation } from '../Operation/IOperation';

export interface IUnitOfWork {
  commit();
  rollback();
  beginTransaction();
  addOperation(operation: IOperation): boolean;
  isBegin(): boolean;
}