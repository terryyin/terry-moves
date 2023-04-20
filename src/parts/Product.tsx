import {AbsoluteFill} from 'remotion'
import React, { CSSProperties } from 'react';
import { ProductFrame } from './ProductFrame';

export const Product: React.FC<{style?: CSSProperties}> = ({ style }) => {

  return (
      <AbsoluteFill style={style}>
        <div style={{position: 'relative', left: '0%', top: '0%', width: '100%', height: '100%'}}>
          <ProductFrame baseScale={0.5} />
				</div>
      </AbsoluteFill>
  );
};