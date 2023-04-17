import React, { CSSProperties } from 'react';
import {Img, staticFile} from 'remotion';

export const CustomerGroup: React.FC<{style?: CSSProperties}> = ({ style }) => {
  return (
      <div style={style}>
				<div style={{position: 'relative', left: '0%', top:'0%', width: '100%', height: '100%'}}>
					<Img src={staticFile("assets/WorriedMom.svg")} style={{position: 'absolute', left: '20%', top: '10%', width: '60%'}} />
					<Img src={staticFile("assets/BabyUser.svg")} style={{position: 'absolute', left: '0%', top: '30%', width: '50%'}} />
				</div>
      </div>
  );
};