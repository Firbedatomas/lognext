import React, { useEffect, useState } from 'react';

interface Price {
  nombre: string;
  valor: number;
}

const Prices: React.FC = () => {
  const [prices, setPrices] = useState<Price[]>([]);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch('/api/prices');
        const pricesData: Price[] = await res.json();
        setPrices(pricesData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPrices();
  }, []);

  return (
    <div>
      <h1>Precios</h1>
      {prices.map((price, index) => (
        <div key={index}>
          <p>{price.nombre}: {price.valor}</p>
        </div>
      ))}
    </div>
  );
};

export default Prices;
