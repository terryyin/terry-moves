import React from 'react';
import { Subtitle } from './models/Subtitles';
import AnimationEffect from './video_components/AnimationEffect';
import { Story } from './video_components/Story';
import { AbsoluteFill } from 'remotion';
import { Company } from './parts/Company';
import { CustomerGroup } from './parts/CustomerGroup';
import { MoneyArrow } from './parts/MoneyArrow';
import { ValueArrow } from './parts/ValueArrow';
import { Subtitles } from './video_components/Subtitles';
import { Markdown } from './video_components/Markdown';
import EdgeWaver from './video_components/EdgeWaver';

export const productDeveloperSubtitles: Subtitle[] = [
	{ leadingBlank: 0, duration: 4, text: 'Product Developers: who are they and why are they on the rise?', actions:[
		{ actor: 'value to customer', actionType: 'appear', startDuration: 1 },
		{ actor: "title", actionType: "additive value change to", duration: 4, value: 90},
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
	{ leadingBlank: 1, duration: 5, text: 'delivering components that are ususally defined by their technology rather than their purpose.' },
	{ leadingBlank: 1, duration: 5, text: 'These components need to be integrated into the larger product later.' },
	{ leadingBlank: 1, duration: 7, text: 'However, times are changing. More businesses are adopting a product-centric strategy, aiming to grow their competitive edge.' },
	{ leadingBlank: 1, duration: 5, text: 'This has sparked the rise of a new breed of developers - Product Developers.' },
	{ leadingBlank: 1, duration: 3, text: 'Who guides their work? A Product Owner.' },
	{ leadingBlank: 1, duration: 6, text: `Yet, Product Developers aren't solely reliant on the PO. They engage directly with 'requirement donors,'` },
	{ leadingBlank: 1, duration: 6, text: `a term for those who've convinced the Product Owner to invest in their product hypothesis.` },
	{ leadingBlank: 1, duration: 8, text: `These donors could be customers, users, product managers, or even fellow developers.	` },
	{ leadingBlank: 1, duration: 6, text: 'Product Developers operate with a customer-centric focus, constantly checking in with reality and seeking early feedback.' },
	{ leadingBlank: 1, duration: 6, text: 'They also maintain a view of the whole product, avoiding local optimization to foster product growth.' },
	{ leadingBlank: 1, duration: 7, text: `So, why does this matter? The rise of Product Developers reflects a pivotal shift in business strategy towards a product-centric model.` },
	{ leadingBlank: 1, duration: 6, text: `They're empowered to work directly with those who hypothesize about the product, in a customer-centric, whole-product-focused way.` },
	{ leadingBlank: 1, duration: 4, text: `Now that's a transformation worth watching.` },
	{ leadingBlank: 1, duration: 10, text: `Thank you for watching. I'm excited to share more about the roles and work processes of Product Developers in future videos. Stay tuned for more insights into this evolving field.` },
];

const titleText = `
# Product Developers:
Who are they and why are they on the rise?`
export const StoryProductDeveloper: React.FC = () => {
  return (
		<Story id="StoryProductDeveloper" subtitles={productDeveloperSubtitles} width={720} >
		  <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
			<AbsoluteFill style={{ backgroundColor: 'beige', fontFamily: "Poppins"}}>
				<AnimationEffect actor="stage">
					<Company style={{position: 'absolute', left: '5%', top:'10%', width: '45%', height: '100%'}}/>
					<CustomerGroup style={{position: 'absolute', left: '70%', top:'15%', width: '25%', height: '100%'}} />
					<div style={{position: 'absolute', left: '45%', top: '35%', width: '25%', height: '25%'}}>
						<AnimationEffect actor="value to customer">
							<ValueArrow />
						</AnimationEffect>
					</div>
					<div style={{position: 'absolute', left: '45%', top: '50%', width: '37%', height: '37%'}}>
						<AnimationEffect actor="value from customer">
							<MoneyArrow />
						</AnimationEffect>
					</div>

					<EdgeWaver actor="title" amplitudePercentageOfHeight={6} frequency={1.2} style={{ paddingTop: '50px', paddingLeft: '10px', left: '0%', top: '35%', width: '100%', height: '65%', backgroundColor: 'rgba(0, 114, 160, 0.8)' }}  >
						<Markdown actor="conclusion" style={{fontSize: "x-large"}}
							md={titleText}
						/>
					</EdgeWaver>
				</AnimationEffect>

				<Subtitles />
			</AbsoluteFill>

    </Story>
  );
};