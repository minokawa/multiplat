import Server from '../libs/server';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import fastifyCors from 'fastify-cors';
import path from 'path';


const ServerFactory = (endpoints,exchange,theme) => {

  const defaults = {
    fastify_server: new fastify({ logger: {file: process.env.SERVER_LOG}  }),
    static_options:  [fastifyStatic, { root: path.resolve(process.env.PUBLIC_DIR), prefix: '/' }],
    cors_options: [fastifyCors, {  origin: false }]
  };

  return new Server(endpoints,exchange,theme, defaults);

};

export default ServerFactory;
