import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import { Company } from './parts/Company';
import { CustomerGroup } from './parts/CustomerGroup';
import { ValueArrow } from './parts/ValueArrow';

export const SceneCustomer: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Sequence  durationInFrames={10 * 30}>
      <Company style={{position: 'absolute', left: '5%', top:'10%', width: '45%', height: '100%'}}/>
      <CustomerGroup style={{position: 'absolute', left: '70%', top:'10%', width: '25%', height: '100%'}} happySince={60}/>
			<div style={{position: 'absolute', left: '45%', top: '40%', width: '25%'}}>
				{frame > 15 && <ValueArrow />}
			</div>
    </Sequence>
  );
};