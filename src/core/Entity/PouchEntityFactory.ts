// import { IEntity } from './IEntity';
// import { IPouchEntity } from './IPouchEntity';

export class PouchEntityFactory {

  public static getInstance() {
    if (!PouchEntityFactory.instance) {
      PouchEntityFactory.instance = new PouchEntityFactory();
    }
    
    return PouchEntityFactory.instance;
  }
  
  private static instance: PouchEntityFactory;

  private constructor() {}

  // public createPouchentity(e: IEntity): IPouchEntity<IEntity> {
  //   const pouchEntity: IPouchEntity<IEntity>
  // }
  
}