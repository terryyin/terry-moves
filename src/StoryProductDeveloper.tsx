import React from 'react';
import { Subtitle } from './models/Subtitles';
import { SceneLayout } from './SceneLayout';
import { Story } from './video_components/Story';

export const productDeveloperSubtitles: Subtitle[] = [
	{ leadingBlank: 0, duration: 4, text: 'Product Developers: who are they and why are they on the rise?', position: "center",  scale: 2,  actions:[
		{ actor: 'value to customer', actionType: 'appear', startDuration: 1 },
	] },
	{ leadingBlank: 1, duration: 5, text: 'Picture this: a company delivering essential solutions to its users.', actions:[
		{ actor: 'value to customer', actionType: 'appear', startDuration: 1 },
	] },
	{ leadingBlank: 0, duration: 6, text: `These solutions tackle the customer's problems and fulfill their needs. And in return?`, actions:[
		{ actor: 'worried-mom', actionType: 'disappear', startDuration: 2 },
		{ actor: 'happy-mom', actionType: 'appear', startDuration: 2 },
		{ actor: 'happy-mom', actionType: 'glow', duration: 2, offset: 3 },
	] },
	{ leadingBlank: 1, duration: 5, text: 'Customers provide the fuel for the company to grow - resources like money.	', actions: [
		{ actor: 'value from customer', actionType: 'appear', startDuration: 1 },
		{ actor: 'company', actionType: 'glow', duration: 2, offset: 3 },
	] },
	{ leadingBlank: 1, duration: 5, text: 'Software products often play a crucial role in providing services.', actions:[
		{ actor: 'product', actionType: 'rotate and rise', duration: 1, value: 4 },
		{ actor: 'product', actionType: '3d rotate', endingTimeAdjustment: 4, totalRotation: [0, 360 + 30, 0] },
	] },
	{ leadingBlank: 1, duration: 5, text: 'But traditionally, businesses have been focused on their core domain, not software. ' },
	{ leadingBlank: 1, duration: 4, text: 'Developers were frequently part of external teams, ', actions:[
		{ actor: 'stage', actionType: 'scale', duration: 1, outputRange: [1, 0.7] },
		{ actor: 'stage', actionType: 'move', duration: 1, absolutePosition: [100, 70] },
	] },
	{ leadingBlank: 1, duration: 5, text: 'Or, internal teams working on individual components, not the whole.', actions:[
	] },
	{ leadingBlank: 1, duration: 3, text: 'They typically work on projects,' },

	{ leadingBlank: 1, duration: 5, text: 'delivering components to be integrated into the larger product later.' },
	{ leadingBlank: 1, duration: 6, text: 'However, times are changing. More and more businesses are adopting a product-centric strategy, aiming to grow their competitive edge.' },
	{ leadingBlank: 1, duration: 4, text: 'This has sparked the rise of a new breed of developers - Product Developers.' },
	{ leadingBlank: 1, duration: 5, text: 'Who guides their work? A Product Owner.' },
	{ leadingBlank: 1, duration: 6, text: `Yet, Product Developers aren't solely reliant on the PO. They engage directly with 'requirement donors,'` },
	{ leadingBlank: 1, duration: 6, text: `a term for those who've convinced the Product Owner to invest in their product hypothesis.` },
	{ leadingBlank: 1, duration: 8, text: `These donors could be customers, users, product managers, or even fellow developers.	` },
	{ leadingBlank: 1, duration: 6, text: 'Product Developers operate with a customer-centric focus, constantly checking in with reality and seeking early feedback.' },
	{ leadingBlank: 1, duration: 6, text: 'They also maintain a view of the whole product, avoiding local optimization to foster product growth.' },
	{ leadingBlank: 1, duration: 6, text: `So, why does this matter? The rise of Product Developers reflects a pivotal shift in business strategy towards a product-centric model.` },
	{ leadingBlank: 1, duration: 6, text: `They're empowered to work directly with those who hypothesize about the product, in a customer-centric, whole-product-focused way.` },
	{ leadingBlank: 1, duration: 4, text: `Now that's a transformation worth watching.` },
	{ leadingBlank: 1, duration: 10, text: `Thank you for watching. I'm excited to share more about the roles and work processes of Product Developers in future videos. Stay tuned for more insights into this evolving field.` },
];

export const StoryProductDeveloper: React.FC = () => {
  return (
		<Story id="StoryProductDeveloper" subtitles={productDeveloperSubtitles} width={720} >
			<SceneLayout />
    </Story>
  );
};