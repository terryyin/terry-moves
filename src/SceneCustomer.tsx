import {interpolate} from 'remotion'
import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import { Company } from './parts/Company';
import { CustomerGroup } from './parts/CustomerGroup';
import { ValueArrow } from './parts/ValueArrow';
import { MoneyArrow } from './parts/MoneyArrow';
import { Subtitles } from './video_components/Subtitles';

const subtitles = [
	{ id: 'subtitle1', startTime: 1, endTime: 3, text: 'First subtitle.' },
	{ id: 'subtitle2', startTime: 4, endTime: 6, text: 'Second subtitle.' },
	{ id: 'subtitle3', startTime: 7, endTime: 9, text: 'Third subtitle.' },
];

export const SceneCustomer: React.FC = () => {
  const frame = useCurrentFrame();
	const fps = 30;
	const viewPosition = interpolate(frame, [7 * fps, 8 * fps], [100, 50], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Sequence  durationInFrames={10 * 30}>
      <div style={{position: 'relative', left: `${100 - viewPosition}%`, top:'0%', width: `${viewPosition}%`, height: `${viewPosition}%`}}>
				<Company style={{position: 'absolute', left: '5%', top:'10%', width: '45%', height: '100%'}}/>
				<CustomerGroup style={{position: 'absolute', left: '70%', top:'15%', width: '25%', height: '100%'}} happySince={2 * fps}/>
				<div style={{position: 'absolute', left: '45%', top: '35%', width: '25%', height: '25%'}}>
					{frame > fps / 2 && <ValueArrow />}
				</div>
				<div style={{position: 'absolute', left: '45%', top: '50%', width: '37%', height: '37%'}}>
					{frame > 4 * fps  && <MoneyArrow />}
				</div>
			</div>
			<Subtitles subtitles={subtitles} frame={frame} fps={fps}/>
    </Sequence>
  );
};