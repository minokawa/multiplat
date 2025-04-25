
import React from 'react';
import ReactServer from 'react-dom/server.js';
import htm from 'htm';
import MoonRocket from '../frontend/moon_rocket';
import { StaticRouter } from 'react-router-dom';

const html = htm.bind(React.createElement);

const Content = ReactServer.renderToString(html`
  <${StaticRouter} location="/" >
    <${MoonRocket}/>
  </>
`);

const base_template = `<!DOCTYPE html>
  <html>
  <head>
  <link rel="stylesheet" type="text/css" href="/css/main.css">
  </head>
    <body>
      <div id='moon_rocket'>${Content} sss</div>
      <script type='text/javascript' src='vendors.bundle.js'></script>
      <script type='text/javascript' src='moon_rocket.bundle.js'></script>
    </body>
  </html>`;

class PageTemplate {
  constructor() {}
  render(){
    return base_template;
  }
}

export default PageTemplate;
