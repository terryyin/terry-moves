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
import { ProductPart } from './parts/ProductPart';
import { ThreeAnimationEffect } from './video_components/ThreeAnimationEffect';
import { ThreeDFrame } from './video_components/ThreeDFrame';

export const productDeveloperSubtitles: Subtitle[] = [
	{ leadingBlank: 0, duration: 5, text: 'Product Developers: who are they and why are they on the rise?', actions:[
		{ actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0, 0, 0] },
		{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [6, -8, 0] },
		{ actor: "title", actionType: "appear", startDuration: 0, endingTimeAdjustment: 5, endDuration: 1 },
		{ actor: "title", actionType: "additive value change to", duration: 5, value: 90},
		{ actor: "title-shadow", actionType: "additive value change to", duration: 0, value: -30},
		{ actor: "title-shadow", actionType: "additive value change to", duration: 5, value: -90},
	] },
	{ leadingBlank: 1, duration: 5, text: 'Picture this: a company delivering services to its users.', actions:[
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
	{ leadingBlank: 1, duration: 4, text: 'In the past, developers were commonly external.', actions:[
		{ actor: 'stage', actionType: 'move', duration: 1, absolutePosition: [350, 0] },
	] },
	{ leadingBlank: 1, duration: 6, text: 'Regardless, they engaged in predictive projects, focusing on tasks split by technology, rather than user needs.', actions:[
	] },
	{ leadingBlank: 1, duration: 5, text: 'Integration was viewed as a simple phase, yet it consistently led to unexpected complications.' },
	{ leadingBlank: 1, duration: 7, text: 'However, times are changing. More businesses are adopting a product-centric strategy, aiming to grow their competitive edge.' },
	{ leadingBlank: 1, duration: 5, text: 'This has sparked the rise of Product Developers.' },
	{ leadingBlank: 1, duration: 3, text: 'Who guides their work? A Product Owner.' },
	{ leadingBlank: 1, duration: 6, text: `Yet, Product Developers aren't solely reliant on the PO. They engage directly with 'requirement donors,'` },
	{ leadingBlank: 1, duration: 6, text: `a term for those who've convinced the Product Owner to invest in their product hypothesis.` },
	{ leadingBlank: 1, duration: 8, text: `These donors could be customers, users, product managers, or even fellow developers.	` },
	{ leadingBlank: 1, duration: 6, text: 'Product Developers operate with a customer-centric focus, constantly checking in with reality and seeking early feedback.' },
	{ leadingBlank: 1, duration: 6, text: 'They also maintain a view of the whole product, avoiding local optimization to foster product growth.' },
	{ leadingBlank: 1, duration: 7, text: `So, why does this matter? The rise of Product Developers reflects a pivotal shift in business strategy towards a product-centric model.` },
	{ leadingBlank: 1, duration: 6, text: `They work directly with those who hypothesize about the product, in a customer-centric, whole-product-focused way.` },
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
					<Company style={{position: 'absolute', left: '0%', top:'15%', width: '50%', height: "60%"}}/>
							<ThreeDFrame debug >
								<ThreeAnimationEffect actor="product">
									<ProductPart
										baseScale={1.4}
										aspectRatio={1}
									/>
								</ThreeAnimationEffect>
							</ThreeDFrame>

					<CustomerGroup style={{position: 'absolute', left: '70%', top:'15%', width: '25%', height: '100%'}} />
					<div style={{position: 'absolute', left: '45%', top: '35%', width: '25%', height: '25%'}}>
						<AnimationEffect actor="value to customer">
							<ValueArrow />
						</AnimationEffect>
					</div>
					<div style={{position: 'absolute', left: '47%', top: '45%', width: '37%', height: '37%'}}>
						<AnimationEffect actor="value from customer">
							<MoneyArrow />
						</AnimationEffect>
					</div>

					<AnimationEffect actor="title" style={{ left: '0%', top: '35%', width: '100%', height: '65%' }} >
						<EdgeWaver actor="title-shadow" amplitudePercentageOfHeight={6} frequency={1.2} style={{ backgroundColor: 'rgba(253, 250, 88, 0.8)' }}  />
						<EdgeWaver actor="title" amplitudePercentageOfHeight={6} frequency={1.2} style={{backgroundColor: 'rgba(0, 114, 160, 0.8)' }}  >
						<Markdown actor="conclusion" style={{ paddingTop: '50px', paddingLeft: '10px', fontSize: "x-large"}}
							md={titleText}
						/>
					</EdgeWaver>
					</AnimationEffect>
				</AnimationEffect>

				<Subtitles />
			</AbsoluteFill>

    </Story>
  );
};