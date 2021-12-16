import 'regenerator-runtime/runtime';
import './readenv';
import DIC  from '@litlag/idianali';
import ServerFactory from './factories/server-factory';
import ExchangeFactory from './factories/exchange-factory';

import Endpoints from './libs/endpoints';
import PageTemplate from './libs/page_template';

const ServerDIC = new DIC();
const Page = new PageTemplate();
const PubEndpoints = new Endpoints('public');



const Exchange = ExchangeFactory();

ServerDIC
  .registerFactory('DemoServer', ServerFactory)
  .registerComponent('endpoints', PubEndpoints)
  .registerComponent('exchange', Exchange)
  .registerComponent('theme', Page);

export const start = async () => {
  const DemoServer = ServerDIC.create('DemoServer');
  try {
    await DemoServer.start(process.env.APP_HTTP_PORT);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
