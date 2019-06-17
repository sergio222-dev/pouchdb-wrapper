import {SchemaBuilder} from "../src/core/SchemaBuilder";

const dataEntry = {
  name: "Sergio",
  lastName: "Romero"
};
/*
const wrongDataEntry = {
  name: "Sergio",
  lastNombre: "Sergio",
};*/

const invalidScheme = {
  type: 'objecto',
};

interface IPerson {
  name: string;
  lastName: string;
}

const schemeTest = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    }
  },
  required: ['name', 'lastName'],
};

describe('SchemaBuilder module', () => {

  const s: SchemaBuilder = new SchemaBuilder();

  it('instance to be SchemeBuilder', () => {
    expect(s).toBeInstanceOf(SchemaBuilder);
  });

  it('ok to add valid scheme', () => {
    expect(s.addSchema('Test', schemeTest)).toBeUndefined();
  });

  it('Throw in wrong scheme', () => {
    expect(() => {
      s.addSchema('Test2', invalidScheme);
    }).toThrow();
  });

  it('Save the data', () => {
    expect(() => {
      s.save<IPerson>('Test', dataEntry, 'Sergio');
    }).toThrow();
  })

});
