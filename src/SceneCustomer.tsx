import React from 'react';
import {Sequence} from 'remotion';
import { Company } from './helpers/Company';

export const SceneCustomer: React.FC = () => {
  return (
    <Sequence  durationInFrames={10 * 30}>
      <Company style={{position: 'absolute', left: '10%', top:'10%', width: '50%', height: '100%'}}/>
    </Sequence>
  );
};