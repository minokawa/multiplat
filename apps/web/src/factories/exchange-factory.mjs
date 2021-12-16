import BinanceSpot from '@litlag/idianali';
import Logger from '@litlag/idianali';

const ExchangeFactory = () => {

  const config = { baseURL: process.env.API_URL,
    logger: Logger,
    enableRateLimit: true,
    adjustForTimeDifference: true,
    recvWindow: 20000 };

  return new BinanceSpot([ process.env.EX_KEY, process.env.EX_SECRET, config ]);
};

export default ExchangeFactory;
