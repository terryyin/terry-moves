import {AbsoluteFill} from 'remotion'
import React, { CSSProperties } from 'react';
import { ThreeDFrame } from '../video_components/ThreeDFrame';
import { ProductPart } from './ProductPart';
import { ThreeAnimationEffect } from '../video_components/ThreeAnimationEffect';

export const Product: React.FC<{style?: CSSProperties}> = ({ style }) => {

  return (
      <AbsoluteFill style={style}>
        <div style={{position: 'relative', left: '0%', top: '0%', width: '100%', height: '100%'}}>
          <ThreeDFrame  cameraDistance={2} cameraY={-0.5}>
            <ThreeAnimationEffect actor="product">
              <ProductPart
                baseScale={1.4}
                aspectRatio={1}
              />
            </ThreeAnimationEffect>
          </ThreeDFrame>
				</div>
      </AbsoluteFill>
  );
};