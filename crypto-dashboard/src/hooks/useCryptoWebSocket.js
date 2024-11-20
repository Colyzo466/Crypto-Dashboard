import { useEffect, useState } from 'react';

const useCryptoWebSocket = (symbol) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(data.p); // `p` is the price in Binance's WebSocket API
    };

    return () => {
      socket.close();
    };
  }, [symbol]);

  return price;
};

export default useCryptoWebSocket;