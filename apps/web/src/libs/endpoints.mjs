import 'regenerator-runtime/runtime';

const Paths = [
  {
    method: 'GET',
    url: '/'
  },
  {
    method: 'GET',
    url: '/api',
    schema: {
      querystring: {
        name: { type: 'string' },
        excitement: { type: 'integer' }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  },
];



class Endpoints  {
  constructor(mode = 'public'){ this.mode = mode; }
  *[Symbol.iterator](){
    for (let i = 0; i < Paths.length; i++) {
      Paths[i].mode = this.mode;
      yield Paths[i];
    }
  }
}

export default Endpoints;
