import assert from 'assert';
import EndpointsIterator from '../src/endpoints';

const webEndpoints = new EndpointsIterator('mobile');
const desktopEndpoints = new EndpointsIterator();

describe('Iterator test', () => {
  it('Check dataset structure', done => {

    console.log('---checking web endpoints');
    for (const x of webEndpoints) {
      console.log(x);
    }

    // console.log('---checking desktop endpoints');
    // for (const x of desktopEndpoints) {
    //   console.log(x);
    // }

    //assert.equal(true, x);
    done();
  });
});
