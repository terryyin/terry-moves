import React from 'react';
import { AnimationContextProvider } from './hooks/useAnimationContext';
import { Subtitle } from './models/Subtitles';
import autonomousComponent from './video_components/autonomousComponent';
import { SceneLayout } from './SceneLayout';

const subtitles: Subtitle[] = [
	{ leadingBlank: 1, duration: 3, text: 'A company delivers services to users,', actions:[
		{ objectId: 'value to customer', actionType: 'appear', duration: 1 },
	] },
	{ leadingBlank: 0, duration: 3, text: 'aiming to solve customers\' problems', actions:[
		{ objectId: 'worried-mom', actionType: 'disappear', duration: 2 },
		{ objectId: 'happy-mom', actionType: 'appear', duration: 2 },
	] },
	{ leadingBlank: 0, duration: 3, text: 'or meet their needs.', actions:[
		{ objectId: 'happy-mom', actionType: 'glow', duration: 2 },
	] },
	{ leadingBlank: 1, duration: 3, text: 'In exchange, customers provide resources,', actions: [
		{ objectId: 'value from customer', actionType: 'appear', duration: 1 },
	] },
	{ leadingBlank: 0, duration: 4, text: 'such as money, to fuel growth.', actions:[
		{ objectId: 'company', actionType: 'glow', duration: 2 },
	] },
	{ leadingBlank: 1, duration: 3, text: 'Software products often play a', actions:[
		{ objectId: 'product', actionType: '3d rise', duration: 1 },
		{ objectId: 'product', actionType: '3d rotate', duration: 1000 },
	] },
	{ leadingBlank: 0, duration: 3, text: 'crucial role in providing services.', actions: [
	]},
	{ leadingBlank: 1, duration: 3, text: 'Traditionally, businesses focused on' },
	{ leadingBlank: 0, duration: 3, text: 'their core domain, not software.' },
	{ leadingBlank: 1, duration: 3, text: 'Developers were part of external teams,', actions:[
		{ objectId: 'stage', actionType: 'scaleToUpperRight', duration: 1, outputRange: [100, 70] },
	] },
	{ leadingBlank: 1, duration: 3, text: 'hired to work on projects.' },
	{ leadingBlank: 1, duration: 3, text: 'They delivered components to be' },
	{ leadingBlank: 1, duration: 3, text: 'integrated with other parts later.' },
	{ leadingBlank: 1, duration: 3, text: 'Now, businesses adopt a product-centric' },
	{ leadingBlank: 1, duration: 3, text: 'strategy to grow their advantage.' },
	{ leadingBlank: 1, duration: 3, text: 'This leads to the rise of' },
	{ leadingBlank: 1, duration: 3, text: 'Product Developers.' },
	{ leadingBlank: 1, duration: 3, text: 'Their work is customer-centric,' },
	{ leadingBlank: 1, duration: 3, text: 'addressing real needs of users.' },
	{ leadingBlank: 1, duration: 3, text: 'They focus on the entire product' },
	{ leadingBlank: 1, duration: 3, text: 'and its seamless user experience.' },
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