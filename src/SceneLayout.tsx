import {AbsoluteFill} from 'remotion'
import React from 'react';
import { Company } from './parts/Company';
import { CustomerGroup } from './parts/CustomerGroup';
import { ValueArrow } from './parts/ValueArrow';
import { MoneyArrow } from './parts/MoneyArrow';
import { Subtitles } from './video_components/Subtitles';
import { StageTransform, sinceSubtitle, useAnimationContext } from './hooks/useCurrentSubtitle';
import { Subtitle } from './models/Subtitles';
import Stage from './video_components/Stage';
import autonomousComponent from './video_components/autonomousComponent';

const subtitles: Subtitle[] = [
	{ id: 'intro1', leadingBlank: 1, duration: 3, text: 'A company delivers services to users,' },
	{ id: 'intro2', leadingBlank: 0, duration: 3, text: 'aiming to solve customers\' problems' },
	{ id: 'intro3', leadingBlank: 0, duration: 3, text: 'or meet their needs.' },
	{ id: 'customerResources1', leadingBlank: 1, duration: 3, text: 'In exchange, customers provide resources,' },
	{ id: 'customerResources2', leadingBlank: 0, duration: 4, text: 'such as money, to fuel growth.' },
	{ id: 'softwareRole1', leadingBlank: 1, duration: 3, text: 'Software products often play a' },
	{ id: 'softwareRole2', leadingBlank: 0, duration: 3, text: 'crucial role in providing services.' },
	{ id: 'traditionalBelief1', leadingBlank: 1, duration: 3, text: 'Traditionally, businesses focused on' },
	{ id: 'traditionalBelief2', leadingBlank: 0, duration: 3, text: 'their core domain, not software.' },
	{ id: 'externalTeams1', leadingBlank: 1, duration: 3, text: 'Developers were part of external teams,' },
	{ id: 'externalTeams2', leadingBlank: 1, duration: 3, text: 'hired to work on projects.' },
	{ id: 'integration1', leadingBlank: 1, duration: 3, text: 'They delivered components to be' },
	{ id: 'integration2', leadingBlank: 1, duration: 3, text: 'integrated with other parts later.' },
	{ id: 'productStrategy1', leadingBlank: 1, duration: 3, text: 'Now, businesses adopt a product-centric' },
	{ id: 'productStrategy2', leadingBlank: 1, duration: 3, text: 'strategy to grow their advantage.' },
	{ id: 'riseDevelopers1', leadingBlank: 1, duration: 3, text: 'This leads to the rise of' },
	{ id: 'riseDevelopers2', leadingBlank: 1, duration: 3, text: 'Product Developers.' },
	{ id: 'customerCentric1', leadingBlank: 1, duration: 3, text: 'Their work is customer-centric,' },
	{ id: 'customerCentric2', leadingBlank: 1, duration: 3, text: 'addressing real needs of users.' },
	{ id: 'wholeProduct1', leadingBlank: 1, duration: 3, text: 'They focus on the entire product' },
	{ id: 'wholeProduct2', leadingBlank: 1, duration: 3, text: 'and its seamless user experience.' },
];

const StageTransforms: StageTransform[] = [
	{ subtitleId: 'externalTeams1', durationInSeconds: 1, outputRange: [100, 70] },
];

export const SceneLayout: React.FC = autonomousComponent(({frame, fps}) => {
  const animationContext  = {
    allSubtitles: subtitles,
    globalFps: fps,
    globalFrame: frame,
  };

	const animationContextWrapper = useAnimationContext();

	const viewPosition = animationContextWrapper.getNumber(StageTransforms);

  return (
    <AbsoluteFill>
      <Stage viewPosition={ viewPosition}>
				<Company animationContext={animationContext} style={{position: 'absolute', left: '5%', top:'10%', width: '45%', height: '100%'}}/>
				<CustomerGroup animationContext={animationContext} style={{position: 'absolute', left: '70%', top:'15%', width: '25%', height: '100%'}} />
				<div style={{position: 'absolute', left: '45%', top: '35%', width: '25%', height: '25%'}}>
					{sinceSubtitle(animationContext, "intro1") && <ValueArrow />}
				</div>
				<div style={{position: 'absolute', left: '45%', top: '50%', width: '37%', height: '37%'}}>
					{sinceSubtitle(animationContext, "customerResources1") && <MoneyArrow />}
				</div>
			</Stage>
			<Subtitles animationContext={animationContext}/>
    </AbsoluteFill>
  );
});