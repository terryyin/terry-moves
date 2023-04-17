import React from 'react';
import {Img, staticFile} from 'remotion';

export const Product: React.FC = () => {
  return (
        <div style={{position: 'absolute', left: '40%', top: '50%', width: '10%'}}>
          <Img src={staticFile("assets/Product.svg")} style={{position: 'absolute', left: '0%', top: '0%', width: '100%'}} />
				</div>
  );
};