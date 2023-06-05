import {Audio} from 'remotion'
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
import { AnimatedGlb } from './video_components/AnimatedGlb';
import { OddeLogo } from './parts/OddeLogo';
import { OddeLogoInner } from './parts/OddeLogoInner';
import { FlipCoin } from './video_components/AutonomousComponents/FlipCoin';

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
	{ leadingBlank: 1, duration: 5, text: 'But traditionally, businesses have been focused on their core domain, not software. ', actions: [
		{ actor: 'business person', actionType: 'appear', startDuration: 1 },
	] },
	{ leadingBlank: 1, duration: 4, text: 'In the past, developers were commonly external.', actions:[
		{ actor: 'stage', actionType: 'move', duration: 1, absolutePosition: [350, 0] },
		{ actor: "camera", actionType: "move", duration: 1, absolutePosition: [-1, 0, 5] },
		{ actor: 'external developers', actionType: 'appear', startDuration: 2, offset: 1 },
	] },
	{ leadingBlank: 1, duration: 8, text: 'Regardless, they were involved in traditional projects, with tasks split by technology rather than user needs, aiming for pre-determined deliverables.', actions:[
		{ actor: 'internal developers', actionType: 'appear', startDuration: 2, offset: 0 },
		{ actor: 'cylinder', actionType: 'scale', outputRange: [0, 1], duration: 3, offset: 2 },
		{ actor: 'hex', actionType: 'scale', outputRange: [0, 1], duration: 3, offset: 2 },
		{ actor: 'month1', actionType: 'appear', startDuration: 1, offset: 2 },
		{ actor: 'month2', actionType: 'appear', startDuration: 1, offset: 4 },
		{ actor: 'month3', actionType: 'appear', startDuration: 1, offset: 5.5 },
		{ actor: 'month4', actionType: 'appear', startDuration: 1, offset: 6.5 },
	] },
	{ leadingBlank: 1, duration: 6, text: 'Integration was seen as a simple phase but often led to unexpected complications.', actions: [
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
	{ leadingBlank: 1, duration: 7, text: 'But now, more businesses are adopting a product-centric strategy, aiming to grow their competitive edge.', actions: [
		{ actor: 'hex', actionType: 'disappear', startDuration: 0.1 },
		{ actor: 'cylinder', actionType: 'disappear', startDuration: 0.1 },
		{ actor: 'stage', actionType: 'move', duration: 2, absolutePosition: [0, 0], },
		{ actor: 'product', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 360 -10, 0], offset: 3 },
		{ actor: 'product', actionType: 'move', duration: 2, absolutePosition: [0, 0.9, 0], offset: 3 },

	]},
	{ leadingBlank: 1, duration: 5, text: 'This has sparked the rise of Product Developers.', actions: [
		{ actor: 'external developers', actionType: 'move', duration: 2, absolutePosition: [280, -125, 0] },
		{ actor: 'external developers', actionType: 'scale', duration: 2, outputRange: [1, 0.8] },
		{ actor: 'developers2', actionType: 'move', duration: 1, absolutePosition: [-9, -15, 0], offset: 2, },
		{ actor: 'developers2', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 180, 0], offset: 3 },
		{ actor: 'manager1', actionType: 'move', duration: 1, absolutePosition: [130, 15, 0], offset: 2, },
		{ actor: 'developers1', actionType: 'move', duration: 1, absolutePosition: [-40, 0, 0], offset: 2, },
		{ actor: 'developers1', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 180, 0], offset: 3 },

	]},
	{ leadingBlank: 1, duration: 4, text: 'A Product Owner sets the direction for development.', actions: [
		{ actor: 'product owner', actionType: 'appear', startDuration: 1, offset: 2 },
	]},
	{ leadingBlank: 1, duration: 6, text: `Yet, instead of solely relying on the PO's explanation, Product Developers engage directly with 'requirement donors',`, actions: [
		{ actor: 'donor cap', actionType: 'appear', startDuration: 1, offset: 2 },
		{ actor: "pd team1", actionType: "connect to", startDuration: 1, endingTimeAdjustment: 3, target: "donor edge", bentLevel: -30, strokeWidth: 2, offset: 3},
		{ actor: "pd team2", actionType: "connect to", startDuration: 1, endingTimeAdjustment: 3, target: "donor edge", bentLevel: -30, strokeWidth: 2, offset: 3},
	]},
	{ leadingBlank: 1, duration: 8, text: `a term for those who've convinced the Product Owner to invest in their product hypothesis.`, actions: [
		{ actor: 'mask', actionType: 'appear', startDuration: 1, endingTimeAdjustment: 8 },
		{ actor: 'connectors', actionType: 'disappear', startDuration: 1, endingTimeAdjustment: 8 },
		{ actor: 'donor explainer', actionType: 'appear', startDuration: 1, endingTimeAdjustment: 8 },
		{ actor: 'aha', actionType: 'appear', startDuration: 1, endingTimeAdjustment: 5, offset: 3 },

	]},
	{ leadingBlank: 1, duration: 8, text: `These donors could be customers, users, product managers, or even fellow developers, etc.	`, actions: [
		{ actor: 'donor cap', actionType: 'move', duration: 1, absolutePosition: [230, 150, 0] },
		{ actor: 'donor cap', actionType: 'scale', duration: 1, outputRange: [1, 0.6] },
		{ actor: 'donor cap', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 0, 20], offset: 0 },
		{ actor: 'donor cap', actionType: 'move', duration: 1, absolutePosition: [180, 380, 0], offset: 2 },
		{ actor: 'donor cap', actionType: 'scale', duration: 1, outputRange: [0.6, 0.4], offset: 2 },
		{ actor: 'donor cap', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 0, 20], offset: 2 },
		{ actor: 'donor cap', actionType: 'move', duration: 0.5, absolutePosition: [180, 460, 0], offset: 3 },
		{ actor: 'donor cap', actionType: '3d rotate', endingTimeAdjustment: 0.5, totalRotation: [0, 0, -20], offset: 3 },
		{ actor: 'donor cap', actionType: 'move', duration: 1, absolutePosition: [-530, 780, 0], offset: 4 },
		{ actor: 'donor cap', actionType: 'scale', duration: 1, outputRange: [0.4, 0.3], offset: 4 },
		{ actor: 'donor cap', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 0, 20], offset: 4 },
		{ actor: 'donor cap', actionType: 'move', duration: 1, absolutePosition: [-1330, 1080, 0], offset: 6 },
		{ actor: 'donor cap', actionType: 'scale', duration: 1, outputRange: [0.4, 0.3], offset: 6 },
		{ actor: 'donor cap', actionType: '3d rotate', endingTimeAdjustment: 1, totalRotation: [0, 0, 20], offset: 6 },
	]},
	{ leadingBlank: 1, duration: 3, text: 'Regardless who is the requirement donor, '},
	{ leadingBlank: 0, duration: 6, text: 'Product Developers operate with a customer-centric focus, constantly checking in with reality and seeking early feedback.', actions: [
		{ actor: 'donor cap', actionType: 'disappear', startDuration: 2},
		{ actor: 'gift product', actionType: 'appear', startDuration: 1, endDuration: 4, endingTimeAdjustment: 6 },
		{ actor: 'gift product', actionType: 'move', duration: 4, absolutePosition: [350, 0, 0], offset: 2 },

	]},
	{ leadingBlank: 1, duration: 6, text: 'They also maintain a view of the whole product, avoiding local optimization to foster product growth.', actions: [

		{ actor: "watering", actionType: "3d animation start", duration: 4, percentage: 100, speed: 1 },
	]},
	{ leadingBlank: 1, duration: 7, text: `So, why does this matter? The rise of Product Developers reflects a pivotal shift in business strategy towards a product-centric model.`, actions: [
		{ actor: 'mask', actionType: 'appear', startDuration: 1 },
		{ actor: 'connectors', actionType: 'disappear', startDuration: 1 },
		{ actor: 'conclusion', actionType: 'appear', startDuration: 1 },
	]},
	{ leadingBlank: 1, duration: 6, text: `They work directly with those who hypothesize about the product, in a customer-centric, whole-product-focused way.`, actions: [

	]},
	{ leadingBlank: 1, duration: 4, text: `Now that's a transformation worth watching.`, actions: [

	]},
	{ leadingBlank: 1, duration: 10, text: `Thank you for watching. I'm excited to share more about how the Product Developers work in future videos. Stay tuned.`, actions: [

	]},
];

const titleText = `
# Product Developers:

### Who are they and why are they on the rise?`

const url = staticFile('assets/shape_sorting_box/scene.gltf')
useLoader.preload(GLTFLoader, url);
const urlPot = staticFile('assets/quillustration_flower_and_water-can/scene.gltf')
useLoader.preload(GLTFLoader, urlPot);

export const StoryProductDeveloper: React.FC = () => {
  return (
		<Story id="StoryProductDeveloper" subtitles={productDeveloperSubtitles} width={720} >
		  <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
			<Audio src={staticFile("assets/audios/product_developer.mp3")} />
			<AbsoluteFill style={{ backgroundColor: 'beige', fontFamily: "Poppins", transformStyle: "preserve-3d" }}>
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

						<ThreeAnimationEffect actor="pot" scale={2.0} rotation={[0.0, 0, 0.0]} position={[1.8,-0.1,1.8]}>
							<AnimatedGlb url={urlPot} actor="watering" />
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
					<Anchor actor="pd team1" style={{left: "20%", top: "28%"}}/>
					<Anchor actor="pd team2" style={{left: "20%", top: "63%"}}/>
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
						<AnimationEffect actor="manager1" style={{width: "5%", top: "0", left: "0%"}}>
							<Img src={staticFile("assets/less/manager.svg")} width="100%" />
						</AnimationEffect>
						<AnimationEffect actor="developers1" style={{width: "15%", top: "3%", left: "8%"}}>
							<Img src={staticFile("assets/less/team_of_three.svg")}  width="100%"/>
						</AnimationEffect>
					</AnimationEffect>

				  <AnimationEffect actor="product owner" style={{left: "40%", top: "25%", width: "80%"}}>
						<AbsoluteFill style={{width: "8%", top: "0", left: "0%"}}>
							<Img src={staticFile("assets/less/po.svg")} />
						</AbsoluteFill>
					</AnimationEffect>
					<AnimationEffect actor="internal developers" style={{left: "3%", top: "25%", width: "80%"}}>
						<AnimationEffect actor="manager2" style={{width: "5%", top: "0", left: "0%"}}>
							<Img src={staticFile("assets/less/manager.svg")} width="100%"/>
						</AnimationEffect>
						<AnimationEffect actor="developers2" style={{width: "15%", top: "3%", left: "8%"}}>
							<Img src={staticFile("assets/less/team_of_three.svg")} width="100%" />
						</AnimationEffect>
					</AnimationEffect>

				  <AnimationEffect actor="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.9)"}}/>

					<AnimationEffect actor="title" style={{ left: '0%', top: '35%', width: '100%', height: '65%' }} >
						<EdgeWaver actor="title-shadow" amplitudePercentageOfHeight={6} frequency={1.2} style={{ backgroundColor: 'rgba(253, 250, 88, 0.8)' }}  />
						<EdgeWaver actor="title" amplitudePercentageOfHeight={6} frequency={1.2} style={{backgroundColor: 'rgba(0, 114, 160, 0.8)' }}  >
						<Markdown actor="" style={{ paddingTop: '50px', paddingLeft: '10px', fontSize: "x-large"}}
							md={titleText}
						/>
					</EdgeWaver>
					<AbsoluteFill style={{ left: '70%', top: '61%', width: '10%', height: '20%'}}>
						<span style={{fontSize: '28px'}}>terry@</span>
					</AbsoluteFill>
					<AbsoluteFill style={{ left: '80%', top: '56%', width: '12%', height: '20%'}}>
						<OddeLogo />
						<FlipCoin speed={2} interval={4} shift={0} >
							<OddeLogoInner />
						</FlipCoin>
					</AbsoluteFill>
				</AnimationEffect>

				</AnimationEffect>

					<Markdown actor="donor explainer" style={{ backgroundColor:"indigo", width: "80%", left:"10%", top: "25%", height:"45%", paddingTop: '', padding: '20px', fontSize: "x-large", borderRadius: "10px"}}
					md={`## Requirement Donor

Anyone who has successfully convinced the Product Owner to invest in their product *hypothesis*.
							`}
				/>

					<Markdown actor="conclusion" style={{ backgroundColor:"indigo", width: "90%", left:"5%", top: "15%", height:"75%", paddingTop: '', padding: '20px', fontSize: "x-large", borderRadius: "10px"}}
					md={`## Conclusion

*	Businesses are shifting to product-building strategies.
* This shift fuels the rise of Product Developers.
* Product Developers:
  * Are guided by a Product Owner.
  * Collaborate directly with 'requirement donors' on product hypotheses.
  * Adopt a customer-centric approach.
  * Focus on the whole product, not isolated parts.
							`}
				/>


				<AnimationEffect actor="donor cap" style={{left: "50%", height: "30%", top: "2%", width: "30%", transformStyle: "preserve-3d" }}>
					<Anchor actor="donor edge" style={{left: "20%", top: "50%"}}/>
					<Img src={staticFile("assets/cap.svg")} width="100%" />
				</AnimationEffect>
				<AnimationEffect actor="aha" style={{left: "70%", height: "30%", top: "55%", width: "28%", transformStyle: "preserve-3d" }}>
					<Img src={staticFile("assets/aha.jpeg")} width="100%" style={{ clipPath: "circle()"}}/>
				</AnimationEffect>
				<AnimationEffect actor="gift product" style={{left: "10%", height: "20%", top: "28%", width: "20%", transformStyle: "preserve-3d" }}>
					<Img src={staticFile("assets/gift_product.svg")} width="100%" />
				</AnimationEffect>


				<Subtitles scale={0.6} />
			</AbsoluteFill>

    </Story>
  );
};