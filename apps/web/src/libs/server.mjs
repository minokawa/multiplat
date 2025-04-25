export class Server{

  components = { fastify_server: null, exchange:null,endpoints:null, theme:null};

  constructor(endpoints,exchange,theme, options){


    const {fastify_server, static_options,cors_options} = options;

    fastify_server.register(...static_options);
    fastify_server.register(...cors_options);

    this.components.exchange = exchange;
    this.components.endpoints = endpoints;
    this.components.theme = theme;
    this.components.fastify_server = fastify_server;
    this.renderPage = this.renderPage.bind(this);
    this.getExchangeData = this.getExchangeData.bind(this);
    this.handleAPI = this.handleAPI.bind(this);
  }

  getExchangeData(){
    console.log('getting binance data');
  }

  renderPage(request, reply){
    const content = this.components.theme.render('/');
    reply.code(200).type('text/html').send(content);
  }

  handleAPI(request, reply){
    reply.send({ hello: 'world23' });
  }

  setHandlers(){
    const {endpoints} = this.components;

    for (const endpoint of endpoints) {
      //Attach handler
      let new_handler = null;

      if('/' === endpoint.url){
        new_handler = this.renderPage;
      }

      if('/api' === endpoint.url){
        new_handler = this.handleAPI;
      }

      if(new_handler !== null){
        endpoint.handler = new_handler;
      }

      this.components.fastify_server.route(endpoint);
    }

  }

  start(port){
    this.setHandlers();
    this.components.fastify_server.listen(port);
  }

}

export default Server;
