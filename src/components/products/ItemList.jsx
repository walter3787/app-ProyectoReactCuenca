import React from 'react';
import { Item } from './Item';

export function ItemList({ productos }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '2rem',
    marginTop: '1.5rem',
  };

  return (
    <div style={gridStyle}>
      {productos.map((prod) => (
        <Item key={prod.id} {...prod} />
      ))}
    </div>
  );
}