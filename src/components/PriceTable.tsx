import React, { useState, useEffect } from 'react';
import { type Exchange } from '../models/exchange-rate.model';
import { services } from '../services';

const PriceTable: React.FC = () => {
  const [providers, setProviders] = useState<Exchange[]>([]);

  useEffect(() => {
    services.forEach(service => {
      service.getInfo().then(exchange => {
        setProviders(prevProviders => [...prevProviders, exchange]);
      });
    });
  }, []);

  if (providers.length === 0) {
    return <div>Loading prices...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Provider</th>
          <th>Currency</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {providers.map(provider =>
          provider.rates.map(rate => (
            <tr key={`${provider.name}-${rate.currency}`}>
              <td>{provider.name}</td>
              <td>{rate.currency}</td>
              <td>{rate.rate.toFixed(2)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default PriceTable;
