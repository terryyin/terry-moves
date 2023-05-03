import React from 'react';
import { Subtitle } from './models/Subtitles';
import { SceneLayout } from './SceneLayout';
import { Story } from './video_components/Story';

const subtitles: Subtitle[] = [
	{ leadingBlank: 1, duration: 4, text: 'A company delivers services to users,', actions:[
		{ actor: 'value to customer', actionType: 'appear', startDuration: 1 },
	] },
	{ leadingBlank: 0, duration: 4, text: 'aiming to solve customers\' problems', actions:[
		{ actor: 'worried-mom', actionType: 'disappear', startDuration: 2 },
		{ actor: 'happy-mom', actionType: 'appear', startDuration: 2 },
	] },
	{ leadingBlank: 0, duration: 4, text: 'or meet their needs.', actions:[
		{ actor: 'happy-mom', actionType: 'glow', duration: 2 },
	] },
	{ leadingBlank: 1, duration: 4, text: 'In exchange, customers provide resources,', actions: [
		{ actor: 'value from customer', actionType: 'appear', startDuration: 1 },
	] },
	{ leadingBlank: 0, duration: 4, text: 'such as money, to fuel growth.', actions:[
		{ actor: 'company', actionType: 'glow', duration: 2 },
	] },
	{ leadingBlank: 1, duration: 3, text: 'Software products often play a', actions:[
		{ actor: 'product', actionType: 'rotate and rise', duration: 1, value: 4 },
		{ actor: 'product', actionType: '3d rotate', startDuration: 4, totalRotation: [0, 360 + 30, 0] },
	] },
	{ leadingBlank: 0, duration: 4, text: 'crucial role in providing services.', actions: [
	]},
	{ leadingBlank: 1, duration: 3, text: 'Traditionally, businesses focused on' },
	{ leadingBlank: 0, duration: 3, text: 'their core domain, not software.' },
	{ leadingBlank: 1, duration: 3, text: 'Developers were part of external teams,', actions:[
		{ actor: 'stage', actionType: 'scale', duration: 1, outputRange: [1, 0.7] },
		{ actor: 'stage', actionType: 'move', duration: 1, absolutePosition: [100, 70] },
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

export const StoryProductDeveloper: React.FC = () => {
  return (
		<Story id="StoryProductDeveloper" subtitles={subtitles}  >
			<SceneLayout />
    </Story>
  );
};