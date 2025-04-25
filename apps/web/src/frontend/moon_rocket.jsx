import React from 'react';
import Header from './partials/header';
import Footer from './partials/footer';
import ReactDOM from 'react-dom';

class MoonRocket extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('Click happened');
  }
  render (){
    return (
      <div>
        <Header/>
        THIS IS THE APP!
        <button onClick={this.handleClick}>Heyo!!!</button>
        <Footer/>
      </div>
    );
  }
}

export default MoonRocket;

const canUseDOM = !!(
  (typeof window !== 'undefined' && window.document && window.document.createElement)
);

//Use conditional rendering for server side
if(canUseDOM){
  ReactDOM.hydrate(<MoonRocket/>, document.getElementById('moon_rocket'));
}

