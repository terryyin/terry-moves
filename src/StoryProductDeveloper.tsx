import {Img} from 'remotion'
import React from 'react';
import { Subtitle } from './models/Subtitles';
import AnimationEffect from './video_components/AnimationEffect';
import { Story } from './video_components/Story';
import { AbsoluteFill, staticFile } from 'remotion';
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
import { GLTFNode } from './video_components/GLTFNode';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Anchor } from './video_components/Anchor';

export const productDeveloperSubtitles: Subtitle[] = [
	{ leadingBlank: 0, duration: 5, text: 'Product Developers: who are they and why are they on the rise?', actions:[
		{ actor: "camera", actionType: "camera look at", duration: 0, absolutePosition: [0, 1.5, 0] },
		{ actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, 0, 5] },
		{ actor: "title", actionType: "appear", startDuration: 0, endingTimeAdjustment: 5, endDuration: 1 },
		{ actor: "title", actionType: "additive value change to", duration: 5, value: 90},
		{ actor: "title-shadow", actionType: "additive value change to", duration: 0, value: -30},
		{ actor: "title-shadow", actionType: "additive value change to", duration: 5, value: -90},
	] },
	{ leadingBlank: 1, duration: 6, text: 'Picture this: a company delivering services to its users to fulfill their needs.', actions:[
		{ actor: 'value to customer', actionType: 'appear', startDuration: 1 },
		{ actor: "company service", actionType: "connect to", startDuration: 1, target: "user", bentLevel: -30, strokeWidth: 5 },
		{ actor: 'worried-mom', actionType: 'disappear', startDuration: 2, offset: 3 },
		{ actor: 'happy-mom', actionType: 'appear', startDuration: 2, offset: 3 },
		{ actor: 'happy-mom', actionType: 'glow', duration: 2, offset: 4 },
	] },
	{ leadingBlank: 1, duration: 6, text: 'And in return? Customers provide the fuel for the company to grow - resources like money.	', actions: [
		{ actor: 'value from customer', actionType: 'appear', startDuration: 1 },
		{ actor: "customer", actionType: "connect to", startDuration: 1, target: "company receiver", bentLevel: -70, strokeWidth: 5 },
		{ actor: 'company', actionType: 'glow', duration: 2, offset: 3 },
	] },
	{ leadingBlank: 1, duration: 5, text: 'Software products often play a crucial role in providing services.', actions:[
		{ actor: 'product', actionType: 'rotate and rise', duration: 1, value: 4 },
		{ actor: 'product', actionType: '3d rotate', endingTimeAdjustment: 4, totalRotation: [0, 360 + 15, 0] },
	] },
	{ leadingBlank: 1, duration: 5, text: 'But traditionally, businesses have been focused on their core domain, not software. ' },
	{ leadingBlank: 1, duration: 4, text: 'In the past, developers were commonly external.', actions:[
		{ actor: 'stage', actionType: 'move', duration: 1, absolutePosition: [350, 0] },
		{ actor: "camera", actionType: "move", duration: 1, absolutePosition: [-1, 0, 5] },
		{ actor: 'external developers', actionType: 'appear', startDuration: 2, offset: 1 },
	] },
	{ leadingBlank: 1, duration: 6, text: 'Regardless, they engaged in predictive projects, focusing on tasks split by technology, rather than user needs.', actions:[
		{ actor: 'internal developers', actionType: 'appear', startDuration: 2, offset: 0 },
		{ actor: 'cylinder', actionType: 'scale', outputRange: [0, 1], duration: 3, offset: 2 },
		{ actor: 'hex', actionType: 'scale', outputRange: [0, 1], duration: 3, offset: 2 },
		{ actor: 'month1', actionType: 'appear', startDuration: 1, offset: 2 },
		{ actor: 'month2', actionType: 'appear', startDuration: 1, offset: 3 },
		{ actor: 'month3', actionType: 'appear', startDuration: 1, offset: 4 },
		{ actor: 'month4', actionType: 'appear', startDuration: 1, offset: 5 },
	] },
	{ leadingBlank: 1, duration: 6, text: 'Integration was viewed as a simple phase, yet it consistently led to unexpected complications.', actions: [
		{ actor: 'hex', actionType: '3d rotate', totalRotation: [-120, 0, -90], endingTimeAdjustment: 3, offset: 2 },
		{ actor: "hex", actionType: "move", duration: 3, absolutePosition: [1.5, 1.1, -0.3], offset: 2 },
		{ actor: 'cylinder', actionType: '3d rotate', totalRotation: [-120, 0, -90], endingTimeAdjustment: 3, offset: 2 },
		{ actor: "cylinder", actionType: "move", duration: 3, absolutePosition: [0, -2.1, -0.2], offset: 2},
		{ actor: 'product', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 360 + 15 + 90, 0], offset: 4 },
		{ actor: "hex", actionType: "move", duration: .5, absolutePosition: [1.0, 1.1, -0.3], offset: 5 },
		{ actor: "cylinder", actionType: "move", duration: .5, absolutePosition: [-0.5, -2.1, -0.2], offset: 5 },
		{ actor: "hex", actionType: "move", duration: .5, absolutePosition: [1.5, 1.1, -0.3], offset: 5.5 },
		{ actor: "cylinder", actionType: "move", duration: .5, absolutePosition: [0, -2.1, -0.2], offset: 5.5 },

	]},
	{ leadingBlank: 1, duration: 7, text: 'However, times are changing. More businesses are adopting a product-centric strategy, aiming to grow their competitive edge.', actions: [

	]},
	{ leadingBlank: 1, duration: 5, text: 'This has sparked the rise of Product Developers.', actions: [

	]},
	{ leadingBlank: 1, duration: 3, text: 'Who guides their work? A Product Owner.', actions: [

	]},
	{ leadingBlank: 1, duration: 6, text: `Yet, Product Developers aren't solely reliant on the PO. They engage directly with 'requirement donors,'`, actions: [

	]},
	{ leadingBlank: 1, duration: 6, text: `a term for those who've convinced the Product Owner to invest in their product hypothesis.`, actions: [

	]},
	{ leadingBlank: 1, duration: 8, text: `These donors could be customers, users, product managers, or even fellow developers.	`, actions: [

	]},
	{ leadingBlank: 1, duration: 6, text: 'Product Developers operate with a customer-centric focus, constantly checking in with reality and seeking early feedback.', actions: [

	]},
	{ leadingBlank: 1, duration: 6, text: 'They also maintain a view of the whole product, avoiding local optimization to foster product growth.', actions: [

	]},
	{ leadingBlank: 1, duration: 7, text: `So, why does this matter? The rise of Product Developers reflects a pivotal shift in business strategy towards a product-centric model.`, actions: [

	]},
	{ leadingBlank: 1, duration: 6, text: `They work directly with those who hypothesize about the product, in a customer-centric, whole-product-focused way.`, actions: [

	]},
	{ leadingBlank: 1, duration: 4, text: `Now that's a transformation worth watching.`, actions: [

	]},
	{ leadingBlank: 1, duration: 10, text: `Thank you for watching. I'm excited to share more about the roles and work processes of Product Developers in future videos. Stay tuned for more insights into this evolving field.`, actions: [

	]},
];

const titleText = `
# Product Developers:
Who are they and why are they on the rise?`

const url = staticFile('assets/shape_sorting_box/scene.gltf')
useLoader.preload(GLTFLoader, url);

export const StoryProductDeveloper: React.FC = () => {
  return (
		<Story id="StoryProductDeveloper" subtitles={productDeveloperSubtitles} width={720} >
		  <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
			<AbsoluteFill style={{ backgroundColor: 'beige', fontFamily: "Poppins"}}>
				<AnimationEffect actor="stage">
					<Company style={{position: 'absolute', left: '0%', top:'15%', width: '50%', height: "60%"}}/>
					<Anchor actor="company service" style={{left: "50%", top: "44%"}}/>
					<Anchor actor="company receiver" style={{left: "50%", top: "60%"}}/>
					<AbsoluteFill style={{width: "150%", left: "-50%"}}>
					<ThreeDFrame debug={false}>
						<directionalLight
							castShadow
							position={[10, 20, 15]}
							intensity={15}
							color={0xffffff}
						/>	
						<ThreeAnimationEffect actor="product">
							<ProductPart />
						</ThreeAnimationEffect>

						<ThreeAnimationEffect actor="hex" scale={0.1} rotation={[0.4, 0, 0.0]} position={[-2.5,0,0]}>
							<GLTFNode recenter url={url} nodeName="g_hex"/>
						</ThreeAnimationEffect>

						<ThreeAnimationEffect actor="cylinder" scale={0.1} rotation={[0.0, 0.2, 0.0]} position={[-1.0,2.5,0]}>
							<GLTFNode recenter url={url} nodeName="g_circle"/>
						</ThreeAnimationEffect>

					</ThreeDFrame>
					</AbsoluteFill>

					<CustomerGroup style={{position: 'absolute', left: '70%', top:'15%', width: '25%', height: '100%'}} />
					<div style={{position: 'absolute', left: '45%', top: '35%', width: '25%', height: '25%'}}>
						<AnimationEffect actor="value to customer">
							<ValueArrow />
						</AnimationEffect>
					</div>
					<div >
						<AnimationEffect actor="value from customer" style={{position: 'absolute', left: '47%', top: '45%', width: '37%', height: '37%'}}>
							<MoneyArrow />
						</AnimationEffect>
					</div>
					<Anchor actor="user" style={{left: "70%", top: "45%"}}/>
					<Anchor actor="customer" style={{left: "86%", top: "50%"}}/>

					<AnimationEffect actor="calendars" style={{left: "-40%", top: "15%", width: "30%"}}>
						<AnimationEffect actor="month1" style={{position: "initial", display: "inline"}}>
							<Img src={staticFile("assets/calendar.svg")} width="80px" />
						</AnimationEffect>
						<AnimationEffect actor="month2" style={{position: "initial", display: "inline"}}>
							<Img src={staticFile("assets/calendar.svg")} width="80px" />
						</AnimationEffect>
						<AnimationEffect actor="month3" style={{position: "initial", display: "inline"}}>
							<Img src={staticFile("assets/calendar.svg")} width="80px" />
						</AnimationEffect>
						<AnimationEffect actor="month4" style={{position: "initial", display: "inline"}}>
							<Img src={staticFile("assets/calendar-deliver.svg")} width="80px" />
						</AnimationEffect>
					</AnimationEffect>
					<AnimationEffect actor="external developers" style={{left: "-40%", top: "65%"}}>
						<AbsoluteFill style={{width: "5%", top: "0", left: "0%"}}>
							<Img src={staticFile("assets/less/manager.svg")} />
						</AbsoluteFill>
						<AbsoluteFill style={{width: "15%", top: "3%", left: "8%"}}>
							<Img src={staticFile("assets/less/team_of_three.svg")} />
						</AbsoluteFill>
						<AbsoluteFill style={{width: "22%", top: "12%", left: "1%"}}>
							External Developers
						</AbsoluteFill>
					</AnimationEffect>

					<AnimationEffect actor="internal developers" style={{left: "3%", top: "25%", width: "80%"}}>
						<AbsoluteFill style={{width: "5%", top: "0", left: "0%"}}>
							<Img src={staticFile("assets/less/manager.svg")} />
						</AbsoluteFill>
						<AbsoluteFill style={{width: "15%", top: "3%", left: "8%"}}>
							<Img src={staticFile("assets/less/team_of_three.svg")} />
						</AbsoluteFill>
						<AbsoluteFill style={{width: "30%", top: "10%", left: "0%"}}>
							Internal Developers
						</AbsoluteFill>
					</AnimationEffect>

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