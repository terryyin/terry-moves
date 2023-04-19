import React from 'react';
import {Sequence } from 'remotion';
import { Company } from './parts/Company';
import { CustomerGroup } from './parts/CustomerGroup';
import { ValueArrow } from './parts/ValueArrow';
import { MoneyArrow } from './parts/MoneyArrow';
import { Subtitles } from './video_components/Subtitles';
import { CurrentSubtitle } from './models/CurrentSubtitle';
import { StageTransform, useCurrentStage, useCurrentSubtitle } from './hooks/useCurrentSubtitle';
import { Subtitle } from './models/Subtitles';
import Stage from './video_components/Stage';
import autonomousComponent from './video_components/autonomousComponent';

const subtitles: Subtitle[] = [
	{ id: 'subtitle1', startTime: 1, endTime: 4, text: 'First subtitle.' },
	{ id: 'subtitle2', startTime: 4, endTime: 7, text: 'Second subtitle.' },
	{ id: 'subtitle3', startTime: 7, endTime: 100, text: 'Third subtitle.' },
];

const StageTransforms: StageTransform[] = [
	{ subtitleId: 'subtitle2', durationInSeconds: 1, outputRange: [100, 50] },
];

export const SceneCustomer: React.FC = autonomousComponent(({frame, fps}) => {
	const currentSubtitle: CurrentSubtitle = useCurrentSubtitle(subtitles, frame, fps);
	const viewPosition = useCurrentStage(StageTransforms, currentSubtitle);

  return (
    <Sequence  durationInFrames={10 * 30}>
      <Stage viewPosition={ viewPosition}>
				<Company style={{position: 'absolute', left: '5%', top:'10%', width: '45%', height: '100%'}}/>
				<CustomerGroup currentSubtitle={currentSubtitle} style={{position: 'absolute', left: '70%', top:'15%', width: '25%', height: '100%'}} />
				<div style={{position: 'absolute', left: '45%', top: '35%', width: '25%', height: '25%'}}>
					{frame > fps / 2 && <ValueArrow />}
				</div>
				<div style={{position: 'absolute', left: '45%', top: '50%', width: '37%', height: '37%'}}>
					{frame > 4 * fps  && <MoneyArrow />}
				</div>
			</Stage>
			<Subtitles currentSubtitle={currentSubtitle}/>
    </Sequence>
  );
});