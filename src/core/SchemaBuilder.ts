import * as Ajv from 'ajv';
import PouchDB from 'pouchdb';

const AJV = new Ajv();

export class SchemaBuilder {

  private schemas = new Map<string, object>();

  public addSchema(name: string, schema: object) {
    const validator = AJV.compile(schema);
    this.schemas.set(name, validator);
  }

  public async save<T>(type: string, data: T, _id?: string) {
    const schema = this.schemas.get(type);

    if (schema === undefined) return false;

    let db = new PouchDB(type);
    await db.put({...data, _id});

    return true;

  }

}
