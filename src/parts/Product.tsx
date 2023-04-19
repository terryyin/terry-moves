import React, { CSSProperties } from 'react';
import { ProductFrame } from './ProductFrame';

export const Product: React.FC<{style?: CSSProperties}> = ({ style }) => {

  return (
      <div style={style}>
        <div style={{position: 'relative', left: '0%', top: '0%', width: '100%', height: '100%'}}>
          <ProductFrame baseScale={0.5} />
          {/* <Img src={staticFile("assets/Product.svg")} style={{position: 'absolute', left: '0%', top: '0%', width: '100%'}} /> */}
				</div>
      </div>
  );
};