import React from 'react';
import { AnimationContextProvider } from './hooks/useAnimationContext';
import { Subtitle } from './models/Subtitles';
import autonomousComponent from './video_components/autonomousComponent';
import { SceneLayout } from './SceneLayout';

const subtitles: Subtitle[] = [
	{ id: 'intro1', leadingBlank: 1, duration: 3, text: 'A company delivers services to users,' },
	{ id: 'intro2', leadingBlank: 0, duration: 3, text: 'aiming to solve customers\' problems', actions:[
		{ objectId: 'worried-mom', action: 'disappear', duration: 2 },
		{ objectId: 'happy-mom', action: 'appear', duration: 2 },
	] },
	{ id: 'intro3', leadingBlank: 0, duration: 3, text: 'or meet their needs.' },
	{ id: 'customerResources1', leadingBlank: 1, duration: 3, text: 'In exchange, customers provide resources,' },
	{ id: 'customerResources2', leadingBlank: 0, duration: 4, text: 'such as money, to fuel growth.' },
	{ id: 'softwareRole1', leadingBlank: 1, duration: 3, text: 'Software products often play a' },
	{ id: 'softwareRole2', leadingBlank: 0, duration: 3, text: 'crucial role in providing services.' },
	{ id: 'traditionalBelief1', leadingBlank: 1, duration: 3, text: 'Traditionally, businesses focused on' },
	{ id: 'traditionalBelief2', leadingBlank: 0, duration: 3, text: 'their core domain, not software.' },
	{ id: 'externalTeams1', leadingBlank: 1, duration: 3, text: 'Developers were part of external teams,', actions:[
		{ objectId: 'stage', action: 'scaleToUpperRight', duration: 1, outputRange: [100, 70] },
	] },
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

export const SceneCustomer: React.FC = autonomousComponent(({frame, fps}) => {
  const animationContext  = {
    allSubtitles: subtitles,
    globalFps: fps,
    globalFrame: frame,
  };

  return (
    <AnimationContextProvider value={animationContext}>
			<SceneLayout />
    </AnimationContextProvider>
  );
});