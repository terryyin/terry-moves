import React, { CSSProperties } from 'react';
import {Img, staticFile} from 'remotion';

interface MyComponentProps {
  style?: CSSProperties;
}

export const Product: React.FC<MyComponentProps> = ({ style }) => {

  return (
      <div style={style}>
        <div style={{position: 'relative', left: '0%', top: '0%', width: '100%'}}>
          <Img src={staticFile("assets/Product.svg")} style={{position: 'absolute', left: '0%', top: '0%', width: '100%'}} />
				</div>
      </div>
  );
};