
import {staticFile} from 'remotion'
import {Img} from 'remotion'
import { Subtitle } from '../models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { ThreeDFrame } from '../video_components/ThreeDFrame';
import { Story } from '../video_components/Story';
import AnimationEffect from '../video_components/AnimationEffect';
import { ScalableScrum, empiricalActions, growScrum1Actions, scaleScrumActions } from '../subtitles/scrum';

export const lessInActionSubtitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 3, text: "", flashBack: { duration: 3, from: 6, speed: 1 }},
		{ leadingBlank: 0, duration: 8, text: "", actions: [
			...growScrum1Actions,
		  { actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, -1, 6] },
			...scaleScrumActions,
			...empiricalActions,
		]},
];

export const StoryLeSSInAction: React.FC = () => {
  return (
		<Story id="StoryLeSSInAction" width={720} height={720} subtitles={lessInActionSubtitles}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<AbsoluteFill style={{ left: '5%', top: '14%', width: '90%', height: '0.5%', backgroundColor: "gray"}} />
			<AnimationEffect actor="less logo" style={{ width: "20%", top: "5%", left: "5%" }}>
				<Img src={staticFile('assets/less/less-logo.svg')} style={{ width: "100%" }}/>
			</AnimationEffect>
			<AbsoluteFill style={{ left: '25%', top: '6.5%', width: '50%', height: '20%'}}>
				<span style={{fontSize: '42px', color: "red", fontFamily: "Poppins, sans serif", fontWeight: "bolder"}}>
					in Action
				</span>
			</AbsoluteFill>
			<AbsoluteFill style={{ left: '6%', top: '15%', width: '88%', height: '20%'}}>
				<span style={{fontSize: '16px', color: "gray", fontFamily: "Poppins, sans serif"}}>
					(5-day fun product development in large scale, absolutely not 'inaction'!)
				</span>
			</AbsoluteFill>
			<AnimationEffect actor="product developer" style={{ width: "20%", top: "40%", left: "40%" }}>
				<Img src={staticFile('assets/lessinaction/product-developer.png')} style={{ width: "100%" }}/>
			</AnimationEffect>
			<AbsoluteFill style={{ left: '70%', top: '85%', width: '20%', height: '20%'}}>
				<ThreeDFrame    >
					<pointLight position={[10, 10, 10]} />
					<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
					<ScalableScrum />
				</ThreeDFrame>
			</AbsoluteFill>
		</AbsoluteFill>
		</Story>
  );
};
