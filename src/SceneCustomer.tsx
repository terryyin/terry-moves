import React from 'react';
import {Img, Sequence, staticFile} from 'remotion';
import { Product } from './parts/Product';

export const SceneCustomer: React.FC = () => {
  return (
    <Sequence  durationInFrames={10 * 30}>
      <div style={{position: 'relative', left: '10%', top:'10%', width: '50%'}}>
        <Img src={staticFile("assets/House.svg")} style={{position: 'absolute', left: '0%', top: '0%', width: '100%'}} />
        <Img src={staticFile("assets/ServicePerson.svg")} style={{position: 'absolute', left: '45%', top: '30%', width: '40%'}} />
        <Product style={{position: 'absolute', left: '20%', top: '50%', width: '30%'}} />
        {/* <Img src={staticFile("assets/Customer.svg")} style={{position: 'absolute', left: '60%', top: '50%'}} />
        Add your animations here */}
      </div>
    </Sequence>
  );
};