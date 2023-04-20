import {AbsoluteFill} from 'remotion'
import React from 'react';
import { Company } from './parts/Company';
import { CustomerGroup } from './parts/CustomerGroup';
import { ValueArrow } from './parts/ValueArrow';
import { MoneyArrow } from './parts/MoneyArrow';
import { Subtitles } from './video_components/Subtitles';
import { StageTransform, useAnimationContext } from './hooks/useCurrentSubtitle';
import Stage from './video_components/Stage';
import autonomousComponent from './video_components/autonomousComponent';

const StageTransforms: StageTransform[] = [
	{ subtitleId: 'externalTeams1', durationInSeconds: 1, outputRange: [100, 70] },
];

export const SceneLayout: React.FC = autonomousComponent(({frame, fps}) => {
	const animationContextWrapper = useAnimationContext();

	const viewPosition = animationContextWrapper.getNumber(StageTransforms);

  return (
    <AbsoluteFill>
      <Stage viewPosition={ viewPosition}>
				<Company style={{position: 'absolute', left: '5%', top:'10%', width: '45%', height: '100%'}}/>
				<CustomerGroup style={{position: 'absolute', left: '70%', top:'15%', width: '25%', height: '100%'}} />
				<div style={{position: 'absolute', left: '45%', top: '35%', width: '25%', height: '25%'}}>
					{animationContextWrapper.sinceSubtitle("intro1") && <ValueArrow />}
				</div>
				<div style={{position: 'absolute', left: '45%', top: '50%', width: '37%', height: '37%'}}>
					{animationContextWrapper.sinceSubtitle("customerResources1") && <MoneyArrow />}
				</div>
			</Stage>
			<Subtitles />
    </AbsoluteFill>
  );
});