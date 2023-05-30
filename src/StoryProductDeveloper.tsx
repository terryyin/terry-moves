import React from 'react';
import { Subtitle } from './models/Subtitles';
import { SceneLayout } from './SceneLayout';
import { Story } from './video_components/Story';

const subtitles: Subtitle[] = [
	{ leadingBlank: 0, duration: 4, text: 'Who Are The Product Developers?', position: "center",  scale: 2,  actions:[
		{ actor: 'value to customer', actionType: 'appear', startDuration: 1 },
	] },
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
	{ leadingBlank: 1, duration: 5, text: 'Software products often play a crucial role in providing services.', actions:[
		{ actor: 'product', actionType: 'rotate and rise', duration: 1, value: 4 },
		{ actor: 'product', actionType: '3d rotate', endingTimeAdjustment: 4, totalRotation: [0, 360 + 30, 0] },
	] },
	{ leadingBlank: 1, duration: 5, text: 'Traditionally, businesses focused on their core domain, not software.' },
	{ leadingBlank: 1, duration: 4, text: 'Developers were often part of external teams.', actions:[
		{ actor: 'stage', actionType: 'scale', duration: 1, outputRange: [1, 0.7] },
		{ actor: 'stage', actionType: 'move', duration: 1, absolutePosition: [100, 70] },
	] },
	{ leadingBlank: 1, duration: 5, text: 'Or, internal teams but only work on a component.', actions:[
	] },
	{ leadingBlank: 1, duration: 3, text: 'The typically work on projects,' },

	{ leadingBlank: 1, duration: 5, text: 'to deliver components to be integrated with other parts later.' },
	{ leadingBlank: 1, duration: 6, text: 'Now, it is getting more common that businesses adopt a product-centric strategy to grow their advantage.' },
	{ leadingBlank: 1, duration: 4, text: 'This leads to the rise of Product Developers.' },
	{ leadingBlank: 1, duration: 5, text: 'A Product Owner will decide the item they work on.' },
	{ leadingBlank: 1, duration: 6, text: `However, instead of relying on the PO to explain the item, or replying on the so-called "internal user,"` },
	{ leadingBlank: 1, duration: 6, text: `they work directly with what I call "requirement donors."` },
	{ leadingBlank: 1, duration: 6, text: `A requirement donor can be anyone who has convinced the Product Owner to invest in their hypothesis for the product.` },
	{ leadingBlank: 1, duration: 8, text: `They can be a customer, a user, a product manager, or even one of the developers.` },
	{ leadingBlank: 1, duration: 6, text: 'The way they work is customer-centric. So that their work get reality check and get feedback early.' },
	{ leadingBlank: 1, duration: 6, text: 'The also focus on the entire product. So to avoid local optimization and they can grow the product.' },
	{ leadingBlank: 1, duration: 6, text: `Conclusion, the rise of the developer is the answer to the business shift to a product-centeric strategy.` },
	{ leadingBlank: 1, duration: 6, text: `They are enpowered to work directly with the product hypothesizer, in a customer-centric, whole product foucs way,` },
	{ leadingBlank: 1, duration: 6, text: `and it's their responsibility to grow the product sustainably.` },
];

export const StoryProductDeveloper: React.FC = () => {
  return (
		<Story id="StoryProductDeveloper" subtitles={subtitles} width={720} >
			<SceneLayout />
    </Story>
  );
};