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
	{ id: 'intro1', startTime: 1, endTime: 4, text: 'A company delivers services to users,' },
	{ id: 'intro2', startTime: 4, endTime: 7, text: 'aiming to solve customers\' problems' },
	{ id: 'intro3', startTime: 7, endTime: 10, text: 'or meet their needs.' },
	{ id: 'customerResources1', startTime: 11, endTime: 14, text: 'In return, customers provide resources,' },
	{ id: 'customerResources2', startTime: 14, endTime: 17, text: 'such as money, to fuel growth.' },
	{ id: 'softwareRole1', startTime: 18, endTime: 21, text: 'Software products often play a' },
	{ id: 'softwareRole2', startTime: 21, endTime: 24, text: 'crucial role in providing services.' },
	{ id: 'traditionalBelief1', startTime: 25, endTime: 28, text: 'Traditionally, businesses focused on' },
	{ id: 'traditionalBelief2', startTime: 28, endTime: 31, text: 'their core domain, not software.' },
	{ id: 'externalTeams1', startTime: 32, endTime: 35, text: 'Developers were part of external teams,' },
	{ id: 'externalTeams2', startTime: 35, endTime: 38, text: 'hired to work on projects.' },
	{ id: 'integration1', startTime: 39, endTime: 42, text: 'They delivered components to be' },
	{ id: 'integration2', startTime: 42, endTime: 45, text: 'integrated with other parts later.' },
	{ id: 'productStrategy1', startTime: 46, endTime: 49, text: 'Now, businesses adopt a product-centric' },
	{ id: 'productStrategy2', startTime: 49, endTime: 52, text: 'strategy to grow their advantage.' },
	{ id: 'riseDevelopers1', startTime: 53, endTime: 56, text: 'This leads to the rise of' },
	{ id: 'riseDevelopers2', startTime: 56, endTime: 59, text: 'Product Developers.' },
	{ id: 'customerCentric1', startTime: 60, endTime: 63, text: 'Their work is customer-centric,' },
	{ id: 'customerCentric2', startTime: 63, endTime: 66, text: 'addressing real needs of users.' },
	{ id: 'wholeProduct1', startTime: 67, endTime: 70, text: 'They focus on the entire product' },
	{ id: 'wholeProduct2', startTime: 70, endTime: 73, text: 'and its seamless user experience.' },
];

const StageTransforms: StageTransform[] = [
	{ subtitleId: 'intro1', durationInSeconds: 1, outputRange: [100, 50] },
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