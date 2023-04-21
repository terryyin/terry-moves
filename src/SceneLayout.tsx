import {AbsoluteFill} from 'remotion'
import React from 'react';
import { Company } from './parts/Company';
import { CustomerGroup } from './parts/CustomerGroup';
import { ValueArrow } from './parts/ValueArrow';
import { MoneyArrow } from './parts/MoneyArrow';
import { Subtitles } from './video_components/Subtitles';
import AnimationEffect from './video_components/AnimationEffect';

export const SceneLayout: React.FC = () => {

  return (
    <AbsoluteFill style={{ backgroundColor: 'beige'}}>
      <AnimationEffect actor="stage">
				<Company style={{position: 'absolute', left: '5%', top:'10%', width: '45%', height: '100%'}}/>
				<CustomerGroup style={{position: 'absolute', left: '70%', top:'15%', width: '25%', height: '100%'}} />
				<div style={{position: 'absolute', left: '45%', top: '35%', width: '25%', height: '25%'}}>
					<AnimationEffect actor="value to customer">
						<ValueArrow />
					</AnimationEffect>
				</div>
				<div style={{position: 'absolute', left: '45%', top: '50%', width: '37%', height: '37%'}}>
					<AnimationEffect actor="value from customer">
					  <MoneyArrow />
					</AnimationEffect>
				</div>
			</AnimationEffect>
			<Subtitles />
    </AbsoluteFill>
  );
};