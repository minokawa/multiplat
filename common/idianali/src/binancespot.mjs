import {Spot} from '@binance/connector';


class BinanceSpot {
  constructor(server_conf) {
    this.spot = new Spot(...server_conf);
  }
  getSpot() {
    const {logger} = this.spot;

    this.spot.account()
      .then(response => {
        logger.log(response.data);
      })
      .catch(err => {
        logger.error(err.response.headers);
        logger.error(err.response.status);
        logger.error(err.response.data);
        logger.error(err.response.config);
      });
  }
}

export default BinanceSpot;
