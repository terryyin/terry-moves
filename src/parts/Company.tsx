import React, { CSSProperties } from 'react';
import {Img, staticFile} from 'remotion';
import { Product } from './Product';
import { GrowingEffect } from '../video_components/GrowingEffect';

export const Company: React.FC<{style?: CSSProperties}> = ({ style }) => {
  return (
      <div style={style}>
				<GrowingEffect startSubtitleId="customerResources2">
				<div style={{position: 'relative', left: '0%', top:'0%', width: '100%', height: '100%'}}>
					<Img src={staticFile("assets/House.svg")} style={{position: 'absolute', left: '0%', top: '0%', width: '100%'}} />
					<Img src={staticFile("assets/ServicePerson.svg")} style={{position: 'absolute', left: '45%', top: '30%', width: '40%'}} />
					<Product style={{position: 'absolute', left: '20%', top: '45%', width: '30%', height: '25%'}} />
				</div>
				</GrowingEffect>
      </div>
  );
};