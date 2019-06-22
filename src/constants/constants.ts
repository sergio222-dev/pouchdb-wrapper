export const constants = {
  VALID_SCHEME: {
    properties: {
      // class: {
      //   type: 'string'
      // },
      name: {
        type: 'string'
      },
      properties: {
        relations: {
          patternProperties: {
            "*": {
              maxProperties: 1,
              minProperties: 1,
              properties: {
                belongTo: 'string',
                hasMany: 'string',
              },
              type: 'object',
            }
          },
          type: 'object',
        }
      },
    },
    required: ['name'],
    type: 'object',
  }
};
